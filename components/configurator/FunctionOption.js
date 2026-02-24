import { CheckIcon } from "@heroicons/react/solid";
import translate from "lib/locales";

export default function FunctionOption({
  item,
  isActive,
  isFixed,
  onToggle,
  onInfo,
  badgeText,
  badgeColor = "bg-gold",
  locale = "it",
}) {
  if (isFixed) {
    return (
      <div className="flex items-start justify-between rounded-md border border-gold bg-white p-4">
        <div>
          <div className="text-xs font-bold text-black">{item.title}</div>
          {onInfo && (
            <button
              onClick={() => onInfo(item)}
              className="block text-xxs text-black/70 underline"
            >
              {translate("viewDetails", locale)}
            </button>
          )}
        </div>
        {badgeText && (
          <span
            className={`shrink-0 rounded-md px-2 py-px text-xxs text-[11px] uppercase text-white ${badgeColor}`}
          >
            {badgeText}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-4 rounded-md px-4 py-3 transition-all lg:py-4 ${
        isActive ? "border-gold bg-gray/30" : "border-[#F4F4F4] bg-[#F4F4F4]"
      } cursor-pointer border`}
      onClick={() => onToggle?.(item.id)}
    >
      <div className="min-w-0 flex-1 lg:flex lg:flex-row-reverse lg:items-center lg:justify-end lg:gap-6">
        <div className="">
          <div className="text-xs font-bold text-black">{item.title}</div>
          {onInfo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInfo(item);
              }}
              className="block text-xxs text-black/80 underline"
            >
              {translate("viewDetails", locale)}
            </button>
          )}
        </div>
        <div className="mt-2 inline-flex w-auto items-center gap-2 rounded-md bg-white p-1.5 px-3 lg:mt-0">
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border bg-white transition-all ${
              isActive
                ? "border-gold bg-gold"
                : "border-gray-dark bg-gray-dark/10"
            }`}
          >
            {isActive && <CheckIcon className="h-4 w-4 text-white" />}
          </div>
          <span className="text-[11px] text-black">
            {isActive ? translate("remove", locale) : translate("addLabel", locale)}
          </span>
        </div>
      </div>
      {badgeText && (
        <span
          className={`shrink-0 rounded-md px-2 py-px text-xxs text-[11px] uppercase text-white ${badgeColor}`}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
}
