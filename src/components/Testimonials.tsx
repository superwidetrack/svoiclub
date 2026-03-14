const testimonials = [
  {
    text: "После трёх лет в Берлине я уже не верила, что найду человека, который поймёт мой юмор про «дачу» и при этом разделяет мои амбиции. Свои Club нашли мне именно такого.",
    name: "Анна К.",
    location: "Берлин, Германия",
    age: "32 года",
  },
  {
    text: "Никаких свайпов, никакой пустоты. Мне предложили двух людей — и с одним из них мы вместе уже полгода. Качество подбора поразило.",
    name: "Дмитрий С.",
    location: "Лондон, Великобритания",
    age: "38 лет",
  },
  {
    text: "Самое ценное — это собеседование. Ты сразу понимаешь, что здесь серьёзный подход. И люди, которых мне подобрали, были на одной волне.",
    name: "Мария В.",
    location: "Тель-Авив, Израиль",
    age: "29 лет",
  },
  {
    text: "Я скептически относился к таким сервисам, но после первого знакомства понял — это работает. Психологический подход делает разницу.",
    name: "Алексей П.",
    location: "Нью-Йорк, США",
    age: "35 лет",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative pattern-bg">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="text-xs text-gold uppercase tracking-[0.3em]">
            Отзывы
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl mt-4 tracking-tight">
            Истории{" "}
            <span className="text-gradient-gold italic">наших людей</span>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-surface border border-white/5 hover:border-gold/20 transition-all duration-300"
            >
              {/* Quote mark */}
              <div className="font-[family-name:var(--font-playfair)] text-gold/20 text-4xl leading-none mb-4">
                &ldquo;
              </div>

              {/* Text */}
              <p className="text-foreground/60 leading-relaxed mb-6 italic">
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="text-gold text-sm font-medium">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground/80">
                    {t.name}
                  </div>
                  <div className="text-xs text-foreground/40">
                    {t.age} &middot; {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
