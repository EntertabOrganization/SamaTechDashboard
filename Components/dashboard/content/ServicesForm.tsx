import { Field, TextArea, TextInput } from "@/Components/dashboard/shared/fields";
import Repeater from "@/Components/dashboard/shared/Repeater";
import SaveBar from "@/Components/dashboard/shared/SaveBar";
import SectionCard from "@/Components/dashboard/shared/SectionCard";
import HeadingFields from "./HeadingFields";

const pillarNumbers = [1, 2, 3];

/** The three pillars have the same fields, so one component renders all of them. */
function PillarFields({ n }: { n: number }) {
  const prefix = `services.pillars.${n}`;
  return (
    <SectionCard
      title={`Pillar 0${n}`}
      description="Shown on the homepage card and on its own page."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title">
          <TextInput name={`${prefix}.title`} placeholder="Pillar title" />
        </Field>
        <Field label="Tab label" hint="Short name used in the tabs.">
          <TextInput name={`${prefix}.tabLabel`} placeholder="Short name" />
        </Field>
        <Field label="Page address" hint="Locked: changing it would break links." className="sm:col-span-2">
          <TextInput name={`${prefix}.slug`} placeholder="pillar-address" disabled />
        </Field>
      </div>
      <Field label="Short description" hint="The paragraph on the homepage card.">
        <TextArea name={`${prefix}.description`} rows={3} placeholder="Short description" />
      </Field>
      <Repeater
        name={`${prefix}.focusAreas`}
        label="Areas of focus (homepage card)"
        itemLabel="Area"
        fields={[{ name: "text", label: "Area of focus" }]}
      />

      <div className="space-y-4 border-t border-ink-100 pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">
          Pillar page
        </p>
        <Field label="The challenge">
          <TextArea name={`${prefix}.challenge`} rows={3} placeholder="The challenge" />
        </Field>
        <Field label="How we help">
          <TextArea name={`${prefix}.help`} rows={3} placeholder="How we help" />
        </Field>
        <Repeater
          name={`${prefix}.capabilities`}
          label="Selected capabilities"
          itemLabel="Capability"
          fields={[{ name: "text", label: "Capability" }]}
        />
        <Repeater
          name={`${prefix}.outcomes`}
          label="Typical outcomes"
          itemLabel="Outcome"
          fields={[{ name: "text", label: "Outcome" }]}
        />
      </div>
    </SectionCard>
  );
}

export default function ServicesForm() {
  return (
    // TODO(backend): add action={saveServices} to this form
    <form className="space-y-4">
      <SectionCard title="Services page" description="The header and the four cross-cutting areas." defaultOpen>
        <HeadingFields prefix="services.intro" />
        <Repeater
          name="services.areas"
          label="Cross-cutting areas"
          itemLabel="Area"
          fields={[
            { name: "title", label: "Title" },
            { name: "description", label: "Description", type: "textarea" },
          ]}
        />
      </SectionCard>

      <SectionCard title="How we work" description="The steps and the Analytical Rigor band.">
        <HeadingFields prefix="services.howWeWork" />
        <Repeater
          name="services.howWeWork.steps"
          label="Steps"
          itemLabel="Step"
          fields={[
            { name: "title", label: "Title" },
            { name: "description", label: "Description", type: "textarea" },
          ]}
        />
        <div className="space-y-4 border-t border-ink-100 pt-4">
          <Field label="Analytical Rigor title">
            <TextInput name="services.rigor.title" placeholder="Title" />
          </Field>
          <Field label="Analytical Rigor text">
            <TextArea name="services.rigor.text" rows={4} placeholder="Paragraph" />
          </Field>
        </div>
      </SectionCard>

      {pillarNumbers.map((n) => (
        <PillarFields key={n} n={n} />
      ))}

      <SaveBar />
    </form>
  );
}
