import { Field, ImageField, TextArea, TextInput, Toggle } from "@/Components/dashboard/shared/fields";
import Repeater from "@/Components/dashboard/shared/Repeater";
import SaveBar from "@/Components/dashboard/shared/SaveBar";
import SectionCard from "@/Components/dashboard/shared/SectionCard";
import HeadingFields from "./HeadingFields";

/**
 * Field names are paths: `home.hero.title`, `home.faq.items[0][question]`, ...
 * The "show on website" toggles are visual defaults (on): the backend sends the saved state.
 * Which sections belong to the homepage is a guess from the website structure.
 */
export default function HomeSectionsForm() {
  return (
    // TODO(backend): add action={saveHome} to this form
    <form className="space-y-4">
      <SectionCard title="Hero" description="The first thing visitors see." defaultOpen>
        <Toggle name="home.hero.visible" label="Show on website" defaultChecked />
        <Field label="Badge text" hint="Small pill above the headline.">
          <TextInput name="home.hero.badge" placeholder="Badge text" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Headline, first line">
            <TextInput name="home.hero.headline1" placeholder="First line" />
          </Field>
          <Field label="Headline, second line" hint="Shown in blue.">
            <TextInput name="home.hero.headline2" placeholder="Second line" />
          </Field>
        </div>
        <Field label="Description">
          <TextArea name="home.hero.description" rows={3} placeholder="Paragraph under the headline" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Primary button label">
            <TextInput name="home.hero.primaryLabel" placeholder="Button label" />
          </Field>
          <Field label="Primary button link">
            <TextInput name="home.hero.primaryHref" placeholder="/contact" />
          </Field>
          <Field label="Secondary button label">
            <TextInput name="home.hero.secondaryLabel" placeholder="Button label" />
          </Field>
          <Field label="Secondary button link">
            <TextInput name="home.hero.secondaryHref" placeholder="/services" />
          </Field>
        </div>
        <Repeater name="home.hero.tags" label="Focus tags" fields={[{ name: "text", label: "Tag" }]} itemLabel="Tag" />
        <ImageField name="home.hero.image" label="Hero image" hint="Wide image, shown under the buttons." />
      </SectionCard>

      <SectionCard
        title="Advisory pillars"
        description="The intro only. The three pillars are edited in Services."
      >
        <Toggle name="home.pillars.visible" label="Show on website" defaultChecked />
        <HeadingFields prefix="home.pillars" />
      </SectionCard>

      <SectionCard title="Who we serve" description="Audiences and their short descriptions.">
        <Toggle name="home.whoWeServe.visible" label="Show on website" defaultChecked />
        <HeadingFields prefix="home.whoWeServe" />
        <Repeater
          name="home.whoWeServe.items"
          label="Audiences"
          itemLabel="Audience"
          fields={[
            { name: "title", label: "Title" },
            { name: "description", label: "Description", type: "textarea" },
          ]}
        />
      </SectionCard>

      <SectionCard title="Why Samatechs" description="The commitments behind every engagement.">
        <Toggle name="home.why.visible" label="Show on website" defaultChecked />
        <HeadingFields prefix="home.why" intro={false} />
        <Repeater
          name="home.why.items"
          label="Commitments"
          itemLabel="Commitment"
          fields={[
            { name: "title", label: "Title" },
            { name: "description", label: "Description", type: "textarea" },
          ]}
        />
      </SectionCard>

      <SectionCard title="Track record" description="Experience the partners bring.">
        <Toggle name="home.trackRecord.visible" label="Show on website" defaultChecked />
        <HeadingFields prefix="home.trackRecord" />
        <Repeater
          name="home.trackRecord.items"
          label="Experience"
          itemLabel="Experience"
          fields={[{ name: "text", label: "Experience" }]}
        />
      </SectionCard>

      <SectionCard title="FAQ and closing banner" description="Common questions and the final call to action.">
        <Toggle name="home.faq.visible" label="Show on website" defaultChecked />
        <HeadingFields prefix="home.faq" />
        <Repeater
          name="home.faq.items"
          label="Questions"
          itemLabel="Question"
          fields={[
            { name: "question", label: "Question" },
            { name: "answer", label: "Answer", type: "textarea" },
          ]}
        />
        <div className="grid gap-4 border-t border-ink-100 pt-4 sm:grid-cols-2">
          <Field label="Banner title">
            <TextInput name="home.cta.title" placeholder="Banner title" />
          </Field>
          <Field label="Banner description">
            <TextInput name="home.cta.description" placeholder="Short text under the title" />
          </Field>
          <Field label="Banner button label">
            <TextInput name="home.cta.label" placeholder="Button label" />
          </Field>
          <Field label="Banner button link">
            <TextInput name="home.cta.href" placeholder="/contact" />
          </Field>
        </div>
      </SectionCard>

      <SaveBar />
    </form>
  );
}
