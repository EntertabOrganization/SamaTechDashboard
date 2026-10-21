"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthBackLink, AuthButton, AuthForm, AuthHeading, AuthShell, EmailField, PasswordField } from "@/Components/dashboard/auth";
import { ApiError, WEBSITE_URL, login } from "@/lib/api";


export default function Page() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;
    email.setCustomValidity("");

    setSubmitting(true);
    try {
      await login(email.value.trim(), password.value);
      router.replace("/");
    } catch (error) {
      // The page has no error area, so the message uses the browser's own validation bubble.
      email.setCustomValidity(
        error instanceof ApiError && error.status === 401
          ? "Invalid email or password."
          : error instanceof Error
            ? error.message
            : "Sign in failed. Please try again.",
      );
      email.reportValidity();
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      brandTitle="Manage your website content in one place."
      brandDescription="Reply to consultation requests, answer contact messages, and update your pages without touching code."
      footer={
        <AuthBackLink href={WEBSITE_URL} showArrow={false}>
          Back to website
        </AuthBackLink>
      }
    >
      <AuthHeading
        title="Sign in"
        description="Use your admin account to open the dashboard."
      />

      <AuthForm onSubmit={handleSubmit}>
        <EmailField required onInput={(e) => e.currentTarget.setCustomValidity("")} />

        <PasswordField
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          required
        />

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/30"
          />
          Keep me signed in
        </label>

        <AuthButton type="submit" disabled={submitting}>Sign in</AuthButton>
      </AuthForm>
    </AuthShell>
  );
}
