import SettingsCard from "@/Components/dashboard/shared/SettingsCard";

export const WEEK_DAYS = [
  { key: "sun", label: "Sunday", on: true },
  { key: "mon", label: "Monday", on: true },
  { key: "tue", label: "Tuesday", on: true },
  { key: "wed", label: "Wednesday", on: true },
  { key: "thu", label: "Thursday", on: true },
  { key: "fri", label: "Friday", on: false },
  { key: "sat", label: "Saturday", on: false },
];

const timeInput =
  "h-9 rounded-lg border border-ink-100 bg-white px-2.5 text-xs font-medium text-ink-900 focus:border-blue-pulse focus:outline-none focus:ring-2 focus:ring-blue-pulse/20";


/** A day's switch and hours, as the form shows them. */
export interface DaySchedule {
  on: boolean;
  start: string;
  end: string;
}

/** `schedule` fills the form from the saved availability, keyed like "sun"; days left out use the defaults. */
export default function WeekSchedule({ schedule }: { schedule?: Partial<Record<string, DaySchedule>> }) {
  return (
    <SettingsCard
      title="Weekly schedule"
      description="Days and hours when visitors can book a consultation."
    >
      <ul className="mt-4 divide-y divide-ink-100 border-t border-ink-100">
        {WEEK_DAYS.map((day) => (
          <li
            key={day.key}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5"
          >
            {/* The checkbox is the "peer": the switch and the times react to it with CSS only. */}
            <input
              id={`${day.key}-enabled`}
              name={`${day.key}_enabled`}
              type="checkbox"
              defaultChecked={schedule?.[day.key]?.on ?? day.on}
              className="peer sr-only"
            />
            <label
              htmlFor={`${day.key}-enabled`}
              className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full bg-[#C9D8EE] transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-blue-pulse peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-pulse peer-focus-visible:ring-offset-2"
            >
              <span className="sr-only">Available on {day.label}</span>
            </label>

            <span className="w-24 text-sm font-semibold text-ink-900">{day.label}</span>

            <div className="ml-auto flex items-center gap-2 peer-not-checked:pointer-events-none peer-not-checked:opacity-40">
              <input
                type="time"
                name={`${day.key}_start`}
                defaultValue={schedule?.[day.key]?.start ?? "09:00"}
                aria-label={`${day.label} start time`}
                className={timeInput}
              />
              <span aria-hidden="true" className="text-xs text-ink-500">
                to
              </span>
              <input
                type="time"
                name={`${day.key}_end`}
                defaultValue={schedule?.[day.key]?.end ?? "16:00"}
                aria-label={`${day.label} end time`}
                className={timeInput}
              />
            </div>
          </li>
        ))}
      </ul>
    </SettingsCard>
  );
}
