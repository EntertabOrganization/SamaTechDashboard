import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import ContentTabs from "@/Components/dashboard/content/ContentTabs";
import ServicesForm from "@/Components/dashboard/content/ServicesForm";

export default function ServicesContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Website"
        title="Services content"
        description="The services page, how we work, and the three advisory pillars."
      />
      <ContentTabs active="services" />
      <ServicesForm />
    </div>
  );
}
