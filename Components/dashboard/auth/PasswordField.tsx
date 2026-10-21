"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { AuthField, type AuthFieldProps } from "./AuthField";

type PasswordFieldProps = Omit<AuthFieldProps, "icon" | "type" | "trailing">;

export function PasswordField({
  autoComplete = "current-password",
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthField
      icon={Lock}
      type={visible ? "text" : "password"}
      autoComplete={autoComplete}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 outline-none transition hover:bg-slate-100 hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-blue-500/40"
        >
          {visible ? (
            <EyeOff className="h-4.5 w-4.5" />
          ) : (
            <Eye className="h-4.5 w-4.5" />
          )}
        </button>
      }
      {...props}
    />
  );
}
