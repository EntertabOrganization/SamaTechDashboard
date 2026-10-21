import { Field, TextArea, TextInput } from "@/Components/dashboard/shared/fields";

interface HeadingFieldsProps {
  /** Field name prefix, e.g. "home.whoWeServe". Sent as `prefix.eyebrow`, `prefix.title`, `prefix.intro`. */
  prefix: string;
  intro?: boolean;
}

/** The eyebrow + title + intro trio that almost every website section has. */
export default function HeadingFields({ prefix, intro = true }: HeadingFieldsProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
        <Field label="Eyebrow" hint="Small blue label above the title.">
          <TextInput name={`${prefix}.eyebrow`} placeholder="Eyebrow" />
        </Field>
        <Field label="Title">
          <TextInput name={`${prefix}.title`} placeholder="Section title" />
        </Field>
      </div>
      {intro && (
        <Field label="Intro">
          <TextArea name={`${prefix}.intro`} rows={3} placeholder="Short paragraph under the title" />
        </Field>
      )}
    </>
  );
}
