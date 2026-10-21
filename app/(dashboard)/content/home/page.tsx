import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import ContentTabs from "@/Components/dashboard/content/ContentTabs";
import HomeSectionsForm from "@/Components/dashboard/content/HomeSectionsForm";

export default function HomeContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Website"
        title="Homepage sections"
        description="Edit each section of the homepage and choose which ones are shown."
      />
      <ContentTabs active="home" />
      <HomeSectionsForm />
    </div>
  );
}
