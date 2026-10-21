import ActionButton from "./ActionButton";
import { CheckIcon } from "./icons";

/** Sticks to the bottom of the screen while the form scrolls. */
export default function SaveBar({ note }: { note?: string }) {
  return (
    <div className="sticky bottom-4 z-30 flex items-center justify-between gap-3 rounded-full border border-ink-100 bg-[#FFFFFFDB] py-2.5 pl-6 pr-2.5 shadow-[0px_8px_24px_-8px_#121A2326] backdrop-blur-[14px]">
      {note && <p className="hidden text-xs text-ink-500 sm:block">{note}</p>}
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
