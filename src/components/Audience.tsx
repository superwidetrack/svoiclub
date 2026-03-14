const traits = [
  {
    title: "Образованные профессионалы",
    description: "IT, медицина, финансы, наука, творчество — люди, которые строят карьеру за рубежом.",
  },
  {
    title: "Ценят глубину",
    description: "Вам важны осмысленные разговоры, психологическая осознанность и эмоциональная зрелость.",
  },
  {
    title: "Русский культурный код",
    description: "Вы скучаете по «своим» — людям, которые понимают ваш юмор, контекст и менталитет.",
  },
  {
    title: "Серьёзные намерения",
    description: "Вы ищете партнёра для жизни, а не мимолётное увлечение. Качество важнее количества.",
  },
  {
    title: "25–45 лет",
    description: "Активные, состоявшиеся люди в лучшем возрасте для построения семьи и отношений.",
  },
  {
    title: "Живут за рубежом",
    description: "Европа, США, Канада, Израиль, ОАЭ и другие страны — география не ограничивает.",
  },
];

export default function Audience() {
  return (
    <section id="audience" className="py-24 sm:py-32 relative bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="text-xs text-gold uppercase tracking-[0.3em]">
            Для кого
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl mt-4 tracking-tight">
            Вы —{" "}
            <span className="text-gradient-gold italic">наш человек</span>
            , если...
          </h2>
        </div>

        {/* Traits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {traits.map((trait, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="text-gold"
                  >
                    <path
                      d="M2 5l2.5 2.5L8 3"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-foreground/90 mb-1">
                    {trait.title}
                  </h3>
                  <p className="text-sm text-foreground/40 leading-relaxed">
                    {trait.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-20 max-w-2xl mx-auto text-center">
          <div className="font-[family-name:var(--font-playfair)] text-gold/30 text-6xl leading-none mb-4">
            &ldquo;
          </div>
          <blockquote className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl italic text-foreground/70 leading-relaxed">
            Мы создали Свои Club, потому что сами были теми эмигрантами,
            которые искали «своих» — и не могли найти.
          </blockquote>
          <div className="mt-6 text-sm text-foreground/40">
            — Основатели, психологи-эмигранты
          </div>
        </div>
      </div>
    </section>
  );
}
