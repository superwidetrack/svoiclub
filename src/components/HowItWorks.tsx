const steps = [
  {
    number: "01",
    title: "Анкета",
    description:
      "Заполните подробную анкету о себе: ценности, жизненные приоритеты, что вы ищете в партнёре. Это не банальные вопросы — мы идём глубже.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="6" y="4" width="20" height="24" rx="2" />
        <path d="M11 10h10M11 14h10M11 18h6" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Психологический тест",
    description:
      "Пройдите тест, разработанный нашими психологами-эмигрантами. Мы оцениваем совместимость по ценностям, привязанности и эмоциональному интеллекту.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="16" cy="16" r="10" />
        <path d="M16 10v6l4 4" />
        <circle cx="16" cy="16" r="2" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Личное интервью",
    description:
      "Короткий видеозвонок с нашим куратором. Мы хотим узнать вас лично — и убедиться, что сообщество подходит именно вам.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="4" y="8" width="24" height="16" rx="2" />
        <circle cx="16" cy="16" r="3" />
        <path d="M22 12h2" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Подбор пары",
    description:
      "Мы вручную подбираем вам совместимых людей. Никаких свайпов — только качественные, осмысленные знакомства с теми, кто разделяет ваш культурный код.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M16 28s-10-7-10-14a6 6 0 0 1 10-4.5A6 6 0 0 1 26 14c0 7-10 14-10 14z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="text-xs text-gold uppercase tracking-[0.3em]">
            Процесс
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl mt-4 tracking-tight">
            Как это{" "}
            <span className="text-gradient-gold italic">работает</span>
          </h2>
          <p className="text-foreground/40 mt-4 max-w-xl mx-auto">
            Четыре шага к знакомству с человеком, который действительно вам
            подходит
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative p-8 rounded-2xl bg-surface border border-white/5 hover:border-gold/20 transition-all duration-500 hover:glow-gold"
            >
              {/* Step number */}
              <span className="font-[family-name:var(--font-playfair)] text-5xl text-white/[0.03] absolute top-4 right-6 group-hover:text-gold/10 transition-colors">
                {step.number}
              </span>

              {/* Icon */}
              <div className="text-gold/60 group-hover:text-gold transition-colors mb-6">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-foreground/40 leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (hidden on last item and mobile) */}
              {step.number !== "04" && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-gold/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
