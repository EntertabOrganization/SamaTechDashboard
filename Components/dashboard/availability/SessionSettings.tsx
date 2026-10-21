import { ClockIcon } from "@/Components/dashboard/Layout/icons";
import InfoTile from "@/Components/dashboard/shared/InfoTile";
import SettingsCard from "@/Components/dashboard/shared/SettingsCard";

export default function SessionSettings() {
  return (
    <SettingsCard title="Session" description="How long each consultation lasts.">
      <div className="space-y-4 px-5 pb-5 pt-4">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-semibold text-ink-900">
            Session length
          </span>
          {/* 45 matches the "45-minute slot" shown on the website. */}
          <select
            name="sessionLength"
            defaultValue="45"
            className="h-10 w-full rounded-xl border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:border-blue-pulse focus:outline-none focus:ring-2 focus:ring-blue-pulse/20"
          >
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </label>

        <InfoTile
          icon={<ClockIcon width={14} height={14} />}
          label="Time zone"
          value="Arabia Standard Time (UTC+3)"
        />
      </div>
    </SettingsCard>
  );
}
