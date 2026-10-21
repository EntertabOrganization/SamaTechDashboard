import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import AboutForm from "@/Components/dashboard/content/AboutForm";
import ContentTabs from "@/Components/dashboard/content/ContentTabs";

export default function AboutContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Website"
        title="About content"
        description="Who we are, mission and vision, differentiators and the founders."
      />
      <ContentTabs active="about" />
      <AboutForm />
    </div>
  );
}
