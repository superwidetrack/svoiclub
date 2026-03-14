"use client";

import { useState } from "react";

const countries = [
  "Германия",
  "США",
  "Великобритания",
  "Канада",
  "Израиль",
  "Франция",
  "Нидерланды",
  "Испания",
  "Италия",
  "Португалия",
  "ОАЭ",
  "Австралия",
  "Швейцария",
  "Австрия",
  "Чехия",
  "Польша",
  "Кипр",
  "Грузия",
  "Турция",
  "Другая",
];

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    age: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — replace with real API call
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <section id="waitlist" className="py-24 sm:py-32 relative bg-surface">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gold"
            >
              <path d="M7 14l5 5L21 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl mb-4">
            Заявка принята
          </h3>
          <p className="text-foreground/50 leading-relaxed">
            Спасибо! Мы свяжемся с вами в ближайшее время, чтобы рассказать о
            следующих шагах. Добро пожаловать в сообщество.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-24 sm:py-32 relative bg-surface">
      <div className="max-w-xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-xs text-gold uppercase tracking-[0.3em]">
            Вступить
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl mt-4 tracking-tight">
            Подайте{" "}
            <span className="text-gradient-gold italic">заявку</span>
          </h2>
          <p className="text-foreground/40 mt-4">
            Оставьте контакт — мы пришлём приглашение на следующий этап
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-foreground/60 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm text-foreground/60 mb-2">
              Страна проживания
            </label>
            <select
              id="country"
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-foreground focus:outline-none focus:border-gold/40 transition-colors appearance-none"
            >
              <option value="" disabled>
                Выберите страну
              </option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm text-foreground/60 mb-2">
              Возраст
            </label>
            <input
              id="age"
              type="number"
              required
              min={18}
              max={99}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="30"
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gold text-background font-medium rounded-xl hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
                Отправляем...
              </span>
            ) : (
              "Подать заявку"
            )}
          </button>

          <p className="text-xs text-foreground/30 text-center">
            Мы не делимся вашими данными с третьими лицами
          </p>
        </form>
      </div>
    </section>
  );
}
