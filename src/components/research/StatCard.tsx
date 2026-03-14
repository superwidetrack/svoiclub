export default function StatCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change?: string;
  icon?: string;
}) {
  const isPositive = change && !change.startsWith("-");

  return (
    <div className="p-5 rounded-xl bg-surface border border-white/5 hover:border-gold/20 transition-colors">
      <div className="flex items-start justify-between">
        <span className="text-xs text-foreground/40 uppercase tracking-wider">
          {label}
        </span>
        {icon && <span className="text-gold/40 text-lg">{icon}</span>}
      </div>
      <div className="mt-2 font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-gradient-gold">
        {value}
      </div>
      {change && (
        <div
          className={`mt-1 text-xs ${
            isPositive ? "text-emerald-400/70" : "text-red-400/70"
          }`}
        >
          {change}
        </div>
      )}
    </div>
  );
}
