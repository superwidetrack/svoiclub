export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pattern-bg overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/3 rounded-full blur-[100px]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-xs text-gold uppercase tracking-[0.2em]">
            Закрытое сообщество
          </span>
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-in-up animation-delay-200 font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight mb-8">
          Найти{" "}
          <span className="text-gradient-gold italic">своего</span>
          <br />
          человека среди
          <br />
          <span className="text-gradient-gold italic">своих</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up animation-delay-400 text-lg sm:text-xl text-foreground/50 max-w-2xl mx-auto leading-relaxed mb-12">
          Премиальный сервис знакомств для русскоязычных эмигрантов.
          <br className="hidden sm:block" />
          Психологический подбор. Личное собеседование. Глубокие совпадения.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="group px-8 py-4 bg-gold text-background font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,169,110,0.3)]"
          >
            Подать заявку
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#how"
            className="px-8 py-4 text-foreground/50 hover:text-foreground transition-colors"
          >
            Узнать больше
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up animation-delay-800 mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-gradient-gold">
              500+
            </div>
            <div className="text-xs text-foreground/40 mt-1 uppercase tracking-wider">
              участников
            </div>
          </div>
          <div>
            <div className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-gradient-gold">
              12
            </div>
            <div className="text-xs text-foreground/40 mt-1 uppercase tracking-wider">
              стран
            </div>
          </div>
          <div>
            <div className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-gradient-gold">
              87%
            </div>
            <div className="text-xs text-foreground/40 mt-1 uppercase tracking-wider">
              точность подбора
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-foreground/30 uppercase tracking-[0.3em]">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent" />
      </div>
    </section>
  );
}
