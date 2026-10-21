import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import ContentTabs from "@/Components/dashboard/content/ContentTabs";
import SeoForm from "@/Components/dashboard/content/SeoForm";

export default function SeoContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Website"
        title="SEO"
        description="How each page appears in search results and when it is shared."
      />
      <ContentTabs active="seo" />
      <SeoForm />
    </div>
  );
}
