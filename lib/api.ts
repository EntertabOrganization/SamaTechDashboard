/**
 * Client for the SAMATECHS backend (SamaTechBackend).
 * The backend keeps the session in an httpOnly `token` cookie on its own origin,
 * so every call runs in the browser with `credentials: "include"`.
 * Set NEXT_PUBLIC_API_URL to the backend's origin, e.g. https://api.samatechs.com.
 */
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/+$/, "");

/** Public website, for "View website". */
export const WEBSITE_URL = (process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000").replace(/\/+$/, "");

const TIMEOUT_MS = 15_000;

/** A failed request. `status` is 0 when the backend could not be reached. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/api${path}`, {
      ...init,
      credentials: "include",
      headers: { Accept: "application/json", ...(init?.body ? { "Content-Type": "application/json" } : {}) },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    throw new ApiError(0, "The server could not be reached");
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(response.status, body?.error ?? `Request failed with status ${response.status}`);
  }
  return body as T;
}

const query = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
};

export interface Paginated<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface ListParams {
  page?: number;
  limit?: number;
}

/* ---------- Auth ---------- */

/** ADMIN manages everything, CONTACT the contact messages, BOOKING the consultations and availability. */
export type UserRole = "ADMIN" | "CONTACT" | "BOOKING";

export const USER_ROLES: { value: UserRole; label: string; description: string }[] = [
  { value: "ADMIN", label: "Admin", description: "Everything, including users" },
  { value: "CONTACT", label: "Contact", description: "Contact messages only" },
  { value: "BOOKING", label: "Booking", description: "Consultations and availability" },
];

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

/** What each role may open; ADMIN may open everything. */
export const canManage = (role: UserRole | undefined, area: "users" | "contact" | "booking") =>
  role === "ADMIN" || (area === "contact" && role === "CONTACT") || (area === "booking" && role === "BOOKING");

export async function login(email: string, password: string): Promise<SessionUser> {
  return (await request<{ user: SessionUser }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) })).user;
}

export async function logout(): Promise<void> {
  await request("/auth/logout", { method: "POST" });
}

export async function getCurrentUser(): Promise<SessionUser> {
  return (await request<{ user: SessionUser }>("/auth/me")).user;
}

/* ---------- Users ---------- */

export interface User extends SessionUser {
  createdAt: string;
  updatedAt: string;
}

export function listUsers(params: ListParams = {}) {
  return request<Paginated<User>>(`/users${query({ ...params })}`);
}

/** Gives another person dashboard access. The password needs at least 8 characters. */
export function createUser(input: { email: string; password: string; name?: string; role: UserRole }) {
  return request<User>("/users", { method: "POST", body: JSON.stringify(input) });
}

/** Only the fields sent change; leave `password` out to keep it. */
export function updateUser(id: string, input: { email?: string; password?: string; name?: string; role?: UserRole }) {
  return request<User>(`/users/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteUser(id: string) {
  return request<{ message: string }>(`/users/${encodeURIComponent(id)}`, { method: "DELETE" });
}

/* ---------- Contact messages ---------- */

export type ContactStatus = "NEW" | "READ" | "RESPONDED";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  jobTitle: string | null;
  phone: string | null;
  /** The website's "Area of interest". */
  service: string | null;
  program: string | null;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}

export function listContactMessages(params: ListParams & { status?: ContactStatus } = {}) {
  return request<Paginated<ContactMessage>>(`/contact${query({ ...params })}`);
}

export function getContactMessage(id: string) {
  return request<ContactMessage>(`/contact/${encodeURIComponent(id)}`);
}

export type ContactMessageInput = Partial<Omit<ContactMessage, "id" | "createdAt" | "updatedAt">>;

/** Pass a status to just move the message, or any fields to edit it. */
export function updateContactMessage(id: string, change: ContactStatus | ContactMessageInput) {
  return request<ContactMessage>(`/contact/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(typeof change === "string" ? { status: change } : change),
  });
}

export function deleteContactMessage(id: string) {
  return request<{ message: string }>(`/contact/${encodeURIComponent(id)}`, { method: "DELETE" });
}

/* ---------- Consultations ---------- */

export type ConsultationStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Consultation {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  notes: string | null;
  /** Calendar date at midnight UTC, e.g. "2026-11-01T00:00:00.000Z". */
  date: string;
  /** Slot label on the consultation clock (Asia/Riyadh), e.g. "09:30". */
  time: string;
  meetLink: string;
  status: ConsultationStatus;
  createdAt: string;
  updatedAt: string;
}

export function listConsultations(params: ListParams & { status?: ConsultationStatus } = {}) {
  return request<Paginated<Consultation>>(`/consultations${query({ ...params })}`);
}

/** Editable fields; `date` is "YYYY-MM-DD". */
export type ConsultationInput = Partial<Omit<Consultation, "id" | "createdAt" | "updatedAt">>;

/** Pass a status to just move the booking, or any fields to edit it. */
export function updateConsultation(id: string, change: ConsultationStatus | ConsultationInput) {
  return request<Consultation>(`/consultations/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(typeof change === "string" ? { status: change } : change),
  });
}

export function deleteConsultation(id: string) {
  return request<{ message: string }>(`/consultations/${encodeURIComponent(id)}`, { method: "DELETE" });
}

/* ---------- Availability ---------- */

/** One weekday's bookable times; dayOfWeek follows `Date.getDay()` (0 = Sunday). */
export interface DayAvailability {
  dayOfWeek: number;
  timeSlots: string[];
}

export async function getWeeklyAvailability(): Promise<DayAvailability[]> {
  return (await request<{ data: DayAvailability[] }>("/availability")).data;
}

/** Closes every day for booking. */
export async function clearWeeklyAvailability(): Promise<DayAvailability[]> {
  return (await request<{ data: DayAvailability[] }>("/availability", { method: "DELETE" })).data;
}

/** Replaces the whole week: exactly 7 entries, one per dayOfWeek. */
export async function updateWeeklyAvailability(days: DayAvailability[]): Promise<DayAvailability[]> {
  return (await request<{ data: DayAvailability[] }>("/availability", { method: "PUT", body: JSON.stringify({ days }) })).data;
}
