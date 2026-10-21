import arabic from "./ar.json";

export type Language = "en" | "ar";

export function translate(text: string, language: Language): string {
  if (language === "en") return text;
  const key = text.replace(/\s+/g, " ").trim();
  const value = (arabic as Record<string, string>)[key];
  if (!value) return text;
  return text.replace(/\S[\s\S]*\S|\S/, () => value);
}
