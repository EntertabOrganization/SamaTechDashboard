"use client";

import type { FormEvent } from "react";
import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import BlockedDates from "@/Components/dashboard/availability/BlockedDates";
import SaveBar from "@/Components/dashboard/availability/SaveBar";
import SessionSettings from "@/Components/dashboard/availability/SessionSettings";
import WeekSchedule, { WEEK_DAYS, type DaySchedule } from "@/Components/dashboard/availability/WeekSchedule";
import { getWeeklyAvailability, updateWeeklyAvailability, type DayAvailability } from "@/lib/api";
import { useApi, useSessionGuard } from "@/lib/useApi";

/** "09:30" / "2:30 PM" -> minutes since midnight. */
function toMinutes(label: string): number | null {
  const match = label.trim().match(/^(\d{1,2}):(\d{2})\s?(AM|PM)?$/i);
  if (!match) return null;
  let hours = Number(match[1]) % (match[3] ? 12 : 24);
  if (match[3]?.toUpperCase() === "PM") hours += 12;
  return hours * 60 + Number(match[2]);
}

const toLabel = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

/** A day's slots shown as the form's switch + first and last start time. */
function toSchedule(days: DayAvailability[]): Record<string, DaySchedule> {
  return Object.fromEntries(
    WEEK_DAYS.map((day, dayOfWeek) => {
      const minutes = (days.find((d) => d.dayOfWeek === dayOfWeek)?.timeSlots ?? [])
        .map(toMinutes)
        .filter((m): m is number => m !== null)
        .sort((a, b) => a - b);
      return [
        day.key,
        minutes.length
          ? { on: true, start: toLabel(minutes[0]), end: toLabel(minutes[minutes.length - 1]) }
          : { on: false, start: "09:00", end: "16:00" },
      ];
    }),
  );
}

export default function AvailabilityPage() {
  const onError = useSessionGuard();
  const { data: days, reload } = useApi(getWeeklyAvailability, "availability");
  const saved = days ? toSchedule(days) : undefined;

  const saveAvailability = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!days || !saved) return;
    const form = new FormData(event.currentTarget);
    const step = Number(form.get("sessionLength")) || 45;

    const next: DayAvailability[] = [];
    for (const [dayOfWeek, day] of WEEK_DAYS.entries()) {
      const on = form.get(`${day.key}_enabled`) === "on";
      const start = String(form.get(`${day.key}_start`) ?? "");
      const end = String(form.get(`${day.key}_end`) ?? "");
      const before = saved[day.key];

      if (!on) {
        next.push({ dayOfWeek, timeSlots: [] });
      } else if (before.on && before.start === start && before.end === end) {
        // Unchanged hours keep their exact slots (the saved schedule may skip a lunch break).
        next.push({ dayOfWeek, timeSlots: days.find((d) => d.dayOfWeek === dayOfWeek)?.timeSlots ?? [] });
      } else {
        const first = toMinutes(start);
        const last = toMinutes(end);
        if (first === null || last === null || first > last) {
          window.alert(`${day.label}: the start time must be before the end time.`);
          return;
        }
        // One bookable start time per session length, from the start time to the end time.
        const timeSlots: string[] = [];
        for (let m = first; m <= last; m += step) timeSlots.push(toLabel(m));
        next.push({ dayOfWeek, timeSlots });
      }
    }

    try {
      await updateWeeklyAvailability(next);
    } catch (error) {
      onError(error);
      window.alert(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
    reload();
  };

  return (
    // `key` remounts the inputs so their default values follow the saved schedule.
    <form key={JSON.stringify(days)} onSubmit={saveAvailability} className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Availability"
        description="Choose when visitors can book a consultation on the website."
      />

      <div className="grid items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
        <WeekSchedule schedule={saved} />
        <div className="space-y-4">
          <SessionSettings />
          {/* The API has no blocked dates yet, so this card is not connected. */}
          <BlockedDates />
        </div>
      </div>

      <SaveBar />
    </form>
  );
}
