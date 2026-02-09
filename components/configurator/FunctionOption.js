import { InformationCircleIcon, CheckIcon } from "@heroicons/react/solid";

export default function FunctionOption({
  item,
  isActive,
  isFixed,
  onToggle,
  onInfo,
  badgeText,
  badgeColor = 'bg-gold',
}) {
  return (
    <div
      className={`group flex items-center gap-4 rounded-lg border p-4 transition-all ${
        isActive
          ? 'border-gold bg-pink-light'
          : 'border-pink/50 bg-white hover:border-gold/30'
      } ${isFixed ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={() => !isFixed && onToggle && onToggle(item.id)}
    >
      {/* Checkbox */}
      <div
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-all ${
          isActive
            ? 'border-gold bg-gold'
            : 'border-gray-dark/30 bg-white'
        } ${isFixed ? 'opacity-50' : ''}`}
      >
        {isActive && <CheckIcon className="h-4 w-4 text-white" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${isActive ? 'text-black' : 'text-black/70'}`}>
            {item.title}
          </span>
        </div>
        {isFixed && (
          <span className="text-xs text-black/50">Funzione fissa</span>
        )}
      </div>

      {/* Info button */}
      {onInfo && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInfo(item);
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brown/10 text-brown transition-colors hover:bg-brown hover:text-white"
        >
          <InformationCircleIcon className="h-5 w-5" />
        </button>
      )}

      {/* Badge */}
      {badgeText && (
        <span className={`shrink-0 rounded px-2 py-1 text-xxs font-semibold uppercase tracking-wide text-white ${badgeColor}`}>
          {badgeText}
        </span>
      )}
    </div>
  );
}
