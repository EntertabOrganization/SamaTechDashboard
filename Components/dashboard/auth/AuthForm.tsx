import type { ComponentProps } from "react";

type AuthFormProps = Omit<ComponentProps<"form">, "className">;

export function AuthForm({ children, ...props }: AuthFormProps) {
  return (
    <form className="mt-8 space-y-5" {...props}>
      {children}
    </form>
  );
}
