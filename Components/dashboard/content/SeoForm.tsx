import { Field, ImageField, TextArea, TextInput, Toggle } from "@/Components/dashboard/shared/fields";
import SaveBar from "@/Components/dashboard/shared/SaveBar";
import SectionCard from "@/Components/dashboard/shared/SectionCard";

// The pages that exist on the website. This is structure, not data.
const seoPages = [
  { key: "home", label: "Homepage", path: "/" },
  { key: "services", label: "Services", path: "/services" },
  { key: "about", label: "About", path: "/about" },
  { key: "contact", label: "Contact", path: "/contact" },
  { key: "pillar1", label: "Pillar 01 page", path: "/services/…" },
  { key: "pillar2", label: "Pillar 02 page", path: "/services/…" },
  { key: "pillar3", label: "Pillar 03 page", path: "/services/…" },
];

/** Static layout of how the page shows up in search results. A live preview needs JS later. */
function SearchPreview({ path }: { path: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-[#FAFCFF] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">
        Search preview
      </p>
      <p className="mt-2 text-xs text-ink-500">yourwebsite.com{path}</p>
      <p className="mt-0.5 text-base font-medium text-[#1A0DAB]">Page title appears here</p>
      <p className="mt-0.5 text-xs leading-relaxed text-ink-500">
        The meta description appears here, up to about 160 characters.
      </p>
    </div>
  );
}

export default function SeoForm() {
  return (
    // TODO(backend): add action={saveSeo} to this form
    <form className="space-y-4">
      {seoPages.map((page, i) => (
        <SectionCard
          key={page.key}
          title={page.label}
          description={page.path}
          defaultOpen={i === 0}
        >
          <SearchPreview path={page.path} />
          <Field label="Meta title" hint="Recommended: up to 60 characters.">
            <TextInput name={`seo.${page.key}.title`} maxLength={70} placeholder="Page title" />
          </Field>
          <Field label="Meta description" hint="Recommended: up to 160 characters.">
            <TextArea
              name={`seo.${page.key}.description`}
              rows={3}
              maxLength={200}
              placeholder="What this page is about"
            />
          </Field>
          <ImageField
            name={`seo.${page.key}.image`}
            label="Social image"
            hint="Shown when the page is shared. 1200 × 630 px works best."
          />
          <Field label="Canonical address" hint="Leave empty unless another address is the original.">
            <TextInput name={`seo.${page.key}.canonical`} type="url" placeholder="https://" />
          </Field>
          <Toggle
            name={`seo.${page.key}.noindex`}
            label="Hide from search engines"
            description="Adds noindex. The page stays online."
          />
        </SectionCard>
      ))}

      <SaveBar />
    </form>
  );
}
