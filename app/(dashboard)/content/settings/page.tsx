import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import ContentTabs from "@/Components/dashboard/content/ContentTabs";
import SettingsForm from "@/Components/dashboard/content/SettingsForm";

export default function SettingsContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Website"
        title="Site settings"
        description="Details that appear on every page of the website."
      />
      <ContentTabs active="settings" />
      <SettingsForm />
    </div>
  );
}
