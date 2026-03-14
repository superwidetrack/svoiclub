"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Чем Свои Club отличается от обычных приложений для знакомств?",
    a: "Мы — не приложение для свайпов. Каждый участник проходит анкетирование, психологический тест и личное собеседование. Мы вручную подбираем пары на основе совместимости ценностей, жизненного контекста и эмоциональной зрелости. Качество, а не количество.",
  },
  {
    q: "Сколько стоит участие?",
    a: "Сейчас Свои Club работает в режиме раннего доступа — участие бесплатное для первых 500 участников. В дальнейшем мы планируем ввести членство с символической стоимостью, которая обеспечивает серьёзность намерений.",
  },
  {
    q: "Как проходит собеседование?",
    a: "Это 15-20 минутный видеозвонок с нашим куратором. Никаких стрессовых вопросов — мы просто хотим познакомиться с вами лично и понять, подходит ли вам наше сообщество. Это двусторонний процесс.",
  },
  {
    q: "В каких странах это работает?",
    a: "Наши участники живут в более чем 12 странах: Германия, США, Великобритания, Канада, Израиль, Франция, Нидерланды, ОАЭ и другие. Мы подбираем пары как в рамках одной страны, так и между странами — по вашему желанию.",
  },
  {
    q: "Что если мне не подойдёт ни один из предложенных вариантов?",
    a: "Мы продолжим подбор. Наша цель — не предложить как можно больше людей, а найти действительно подходящего. Иногда это занимает время, но результат стоит ожидания.",
  },
  {
    q: "Кто стоит за проектом?",
    a: "Свои Club основан психологами-эмигрантами, которые сами прошли через опыт поиска «своих» за рубежом. Мы совмещаем профессиональную экспертизу в психологии с глубоким пониманием эмигрантского контекста.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs text-gold uppercase tracking-[0.3em]">
            FAQ
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl mt-4 tracking-tight">
            Частые{" "}
            <span className="text-gradient-gold italic">вопросы</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-white/5 rounded-xl overflow-hidden hover:border-gold/20 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-foreground/80 pr-4">{faq.q}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`text-gold/60 shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                </svg>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm text-foreground/40 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
