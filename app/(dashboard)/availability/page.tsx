import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import BlockedDates from "@/Components/dashboard/availability/BlockedDates";
import SaveBar from "@/Components/dashboard/availability/SaveBar";
import SessionSettings from "@/Components/dashboard/availability/SessionSettings";
import WeekSchedule from "@/Components/dashboard/availability/WeekSchedule";

export default function AvailabilityPage() {
  return (
    // TODO(backend): add action={saveAvailability} to this form
    <form className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Availability"
        description="Choose when visitors can book a consultation on the website."
      />

      <div className="grid items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
        <WeekSchedule />
        <div className="space-y-4">
          <SessionSettings />
          {/* TODO(backend): pass the dates as <BlockedDateChip label="..." /> children */}
          <BlockedDates />
        </div>
      </div>

      <SaveBar />
    </form>
  );
}
