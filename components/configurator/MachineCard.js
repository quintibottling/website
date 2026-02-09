import { ArrowRightIcon } from "@heroicons/react/solid";

const TIER_COLORS = {
  start: 'bg-green',
  intermediate: 'bg-gold',
  pro: 'bg-orange',
};

const TIER_LEVELS = {
  start: 'Livello 1',
  intermediate: 'Livello 2',
  pro: 'Livello 3',
};

export default function MachineCard({ machine, isSelected, onSelect, locale }) {
  const colorClass = TIER_COLORS[machine.slug] || 'bg-gold';
  const level = TIER_LEVELS[machine.slug] || '';

  const fixedFunctions = machine.functions.filter(fn => fn.fixed);
  const optionalFunctions = machine.functions.filter(fn => !fn.fixed);

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 ${
        isSelected
          ? 'border-gold bg-brown'
          : 'border-pink/30 bg-pink-light hover:border-gold/50'
      }`}
      onClick={() => onSelect(machine.slug)}
    >
      {/* Badge */}
      <div className={`absolute top-4 left-4 ${colorClass} rounded px-3 py-1`}>
        <span className="text-xxs font-semibold uppercase tracking-wider text-white">
          {level}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 pt-14">
        {/* Title */}
        <h3 className={`mb-2 text-xl font-semibold lg:text-2xl ${isSelected ? 'text-white' : 'text-black'}`}>
          Diamond Oil
        </h3>
        <h4 className={`mb-4 text-2xl font-bold lg:text-3xl ${
          isSelected ? 'text-gold-light' : `text-${machine.slug === 'start' ? 'green' : machine.slug === 'intermediate' ? 'gold' : 'orange'}`
        }`}>
          {machine.title.toUpperCase()}
        </h4>

        {/* Functions list */}
        <div className="mb-6 space-y-2">
          {fixedFunctions.slice(0, 3).map(fn => (
            <div
              key={fn.id}
              className={`flex items-center gap-2 text-sm ${isSelected ? 'text-gray' : 'text-black/70'}`}
            >
              <span className="text-gold">+</span>
              <span>{fn.title}</span>
            </div>
          ))}
          {optionalFunctions.length > 0 && (
            <div className={`text-sm ${isSelected ? 'text-gray/60' : 'text-black/50'}`}>
              + {optionalFunctions.length} funzioni opzionali
            </div>
          )}
        </div>

        {/* CTA */}
        <div className={`group/btn flex items-center gap-2 ${isSelected ? 'text-gold-light' : 'text-gold'}`}>
          <span className="text-sm font-medium">Configura</span>
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />
      )}
    </div>
  );
}
