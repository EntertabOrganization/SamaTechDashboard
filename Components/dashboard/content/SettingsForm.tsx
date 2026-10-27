import { Field, ImageField, TextArea, TextInput } from "@/Components/dashboard/shared/fields";
import SaveBar from "@/Components/dashboard/shared/SaveBar";
import SectionCard from "@/Components/dashboard/shared/SectionCard";

export default function SettingsForm() {
  return (
    // TODO(backend): add action={saveSettings} to this form
    <form className="space-y-4">
      <SectionCard title="General" description="Name and logos used across the website." defaultOpen>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Site name">
            <TextInput name="settings.siteName" placeholder="Site name" />
          </Field>
          <Field label="Tagline">
            <TextInput name="settings.tagline" placeholder="Short line about the firm" />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageField name="settings.logo" label="Logo" hint="For light backgrounds." />
          <ImageField name="settings.logoWhite" label="White logo" hint="For dark backgrounds, like the footer." />
        </div>
        <ImageField name="settings.favicon" label="Favicon" hint="Square, at least 48 × 48 px." />
      </SectionCard>

      <SectionCard title="Contact details" description="Shown on the Contact page and in the footer.">
        <Field label="Address">
          <TextArea name="settings.address" rows={2} placeholder="Address" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email">
            <TextInput name="settings.email" type="email" placeholder="name@organization.com" />
          </Field>
          <Field label="Phone">
            <TextInput name="settings.phone" type="tel" placeholder="Phone number" />
          </Field>
          <Field label="Response time" className="sm:col-span-2">
            <TextInput name="settings.responseTime" placeholder="Within one business day" />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Social links" description="Leave a field empty to hide that icon.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="LinkedIn">
            <TextInput name="settings.social.linkedin" type="url" placeholder="https://" />
          </Field>
          <Field label="X">
            <TextInput name="settings.social.x" type="url" placeholder="https://" />
          </Field>
          <Field label="Instagram">
            <TextInput name="settings.social.instagram" type="url" placeholder="https://" />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Footer">
        <Field label="Description" hint="The paragraph under the logo.">
          <TextArea name="settings.footer.description" rows={3} placeholder="Short description" />
        </Field>
        <Field label="Copyright text" hint="The year is added automatically.">
          <TextInput name="settings.footer.copyright" placeholder="SAMATECHS. All rights reserved." />
        </Field>
      </SectionCard>

      <SectionCard title="Default SEO" description="Used by any page that has no SEO of its own.">
        <Field label="Title template" hint="%s is replaced by the page title.">
          <TextInput name="settings.seo.titleTemplate" placeholder="%s | Site name" />
        </Field>
        <Field label="Default description">
          <TextArea name="settings.seo.description" rows={3} placeholder="Default meta description" />
        </Field>
        <ImageField name="settings.seo.image" label="Default social image" hint="1200 × 630 px works best." />
      </SectionCard>

      <SaveBar />
    </form>
  );
}
