import ActionButton from "@/Components/dashboard/shared/ActionButton";
import { CheckIcon } from "@/Components/dashboard/shared/icons";

/** Sticks to the bottom of the screen while the form scrolls. */
export default function SaveBar() {
  return (
    <div className="sticky bottom-4 z-30 flex items-center justify-between gap-3 rounded-full border border-ink-100 bg-[#FFFFFFDB] py-2.5 pl-6 pr-2.5 shadow-[0px_8px_24px_-8px_#121A2326] backdrop-blur-[14px]">
      <p className="hidden text-xs text-ink-500 sm:block">
        Times use Arabia Standard Time (UTC+3).
      </p>
      <div className="ml-auto flex items-center gap-2">
        <ActionButton type="reset" variant="ghost">
          Discard
        </ActionButton>
        <ActionButton type="submit" variant="dark" icon={<CheckIcon />}>
          Save changes
        </ActionButton>
      </div>
    </div>
  );
}
