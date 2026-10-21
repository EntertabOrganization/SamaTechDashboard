import { Field, ImageField, TextArea, TextInput } from "@/Components/dashboard/shared/fields";
import Repeater from "@/Components/dashboard/shared/Repeater";
import SaveBar from "@/Components/dashboard/shared/SaveBar";
import SectionCard from "@/Components/dashboard/shared/SectionCard";
import HeadingFields from "./HeadingFields";

const partnerNumbers = [1, 2, 3];

function PartnerFields({ n }: { n: number }) {
  const prefix = `about.partners.${n}`;
  return (
    <SectionCard title={`Founder 0${n}`} description="Photo, role, bio and social links.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <TextInput name={`${prefix}.name`} placeholder="Full name" />
        </Field>
        <Field label="Tagline" hint="One short line under the role.">
          <TextInput name={`${prefix}.tagline`} placeholder="Tagline" />
        </Field>
        <Field label="Role" className="sm:col-span-2">
          <TextInput name={`${prefix}.role`} placeholder="Role and focus area" />
        </Field>
      </div>
      <Field label="Bio">
        <TextArea name={`${prefix}.bio`} rows={6} placeholder="Biography" />
      </Field>
      <ImageField name={`${prefix}.photo`} label="Photo" hint="Landscape works best." />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="LinkedIn">
          <TextInput name={`${prefix}.linkedin`} type="url" placeholder="https://" />
        </Field>
        <Field label="X">
          <TextInput name={`${prefix}.x`} type="url" placeholder="https://" />
        </Field>
        <Field label="Instagram">
          <TextInput name={`${prefix}.instagram`} type="url" placeholder="https://" />
        </Field>
      </div>
    </SectionCard>
  );
}

export default function AboutForm() {
  return (
    // TODO(backend): add action={saveAbout} to this form
    <form className="space-y-4">
      <SectionCard title="Who we are" description="The About page header." defaultOpen>
        <HeadingFields prefix="about.intro" intro={false} />
        <Field label="Lead paragraph">
          <TextArea name="about.intro.lead" rows={3} placeholder="Main paragraph" />
        </Field>
        <Field label="Second paragraph">
          <TextArea name="about.intro.secondary" rows={4} placeholder="Supporting paragraph" />
        </Field>
        <ImageField name="about.intro.image" label="Image" />
      </SectionCard>

      <SectionCard title="Mission and vision">
        <Field label="Mission">
          <TextArea name="about.mission" rows={4} placeholder="Mission statement" />
        </Field>
        <Field label="Vision">
          <TextArea name="about.vision" rows={4} placeholder="Vision statement" />
        </Field>
      </SectionCard>

      <SectionCard title="Why Samatechs" description="Differentiators with a short text each.">
        <HeadingFields prefix="about.differentiators" intro={false} />
        <Repeater
          name="about.differentiators.items"
          label="Differentiators"
          itemLabel="Differentiator"
          fields={[
            { name: "title", label: "Title" },
            { name: "text", label: "Text", type: "textarea" },
          ]}
        />
      </SectionCard>

      <SectionCard title="Founders section" description="Header and legal note. The people are below.">
        <HeadingFields prefix="about.founders" intro={false} />
        <Field label="Disclaimer">
          <TextArea name="about.founders.disclaimer" rows={3} placeholder="Professional background disclaimer" />
        </Field>
      </SectionCard>

      {partnerNumbers.map((n) => (
        <PartnerFields key={n} n={n} />
      ))}

      <SectionCard title="Closing banner">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title">
            <TextInput name="about.cta.title" placeholder="Banner title" />
          </Field>
          <Field label="Button label">
            <TextInput name="about.cta.label" placeholder="Button label" />
          </Field>
        </div>
      </SectionCard>

      <SaveBar />
    </form>
  );
}
