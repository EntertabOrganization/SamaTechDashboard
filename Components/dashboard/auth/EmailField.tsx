import { Mail } from "lucide-react";
import { AuthField, type AuthFieldProps } from "./AuthField";

type EmailFieldProps = Partial<Omit<AuthFieldProps, "icon" | "type">>;

export function EmailField({
  id = "email",
  name = "email",
  label = "Email",
  autoComplete = "email",
  placeholder = "you@samatechs.com",
  ...props
}: EmailFieldProps) {
  return (
    <AuthField
      id={id}
      name={name}
      label={label}
      icon={Mail}
      type="email"
      autoComplete={autoComplete}
      placeholder={placeholder}
      {...props}
    />
  );
}
