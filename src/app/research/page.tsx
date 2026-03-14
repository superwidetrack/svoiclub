import Link from "next/link";
import ResearchLayout from "@/components/research/ResearchLayout";
import { getDocsStatus, type DocStatus } from "@/lib/docs";

const sections = [
  {
    file: "COMPETITORS.md",
    href: "/research/competitors",
    title: "Анализ конкурентов",
    description:
      "Tawkify, Luxy, Inner Circle, Raya — разбор позиционирования, UX, ценообразования и стратегий лидеров рынка.",
    icon: "◈",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    file: "AUDIENCE.md",
    href: "/research/audience",
    title: "Целевая аудитория",
    description:
      "Демография, география, психографика, TAM/SAM/SOM русскоязычной диаспоры за рубежом.",
    icon: "◉",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    file: "MARKETING-STRATEGY.md",
    href: "/research/marketing",
    title: "Маркетинговая стратегия",
    description:
      "Каналы привлечения, unit economics, воронка, контент-стратегия и roadmap запуска.",
    icon: "◎",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    file: "PRODUCT-DESIGN.md",
    href: "/research/product",
    title: "Продуктовый дизайн",
    description:
      "Опросник, UX-флоу, алгоритм подбора, модель совместимости, MVP-скоуп.",
    icon: "◇",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

function StatusBadge({ status }: { status: DocStatus }) {
  if (status === "ready") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Готово
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
      Исследуется...
    </span>
  );
}

export const dynamic = "force-dynamic";

export default async function ResearchDashboard() {
  const statuses = await getDocsStatus();
  const readyCount = Object.values(statuses).filter(
    (s) => s === "ready"
  ).length;

  return (
    <ResearchLayout
      title="Research Dashboard"
      subtitle="Стратегическое исследование для запуска Свои Club — анализ рынка, аудитории, продукта и маркетинга"
    >
      {/* Progress bar */}
      <div className="mb-8 p-5 rounded-xl bg-surface border border-white/5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-foreground/60">
            Прогресс исследования
          </span>
          <span className="text-sm text-gold">
            {readyCount}/4 разделов
          </span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-500"
            style={{ width: `${(readyCount / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const status = statuses[section.file];
          const isReady = status === "ready";

          return (
            <Link
              key={section.href}
              href={section.href}
              className={`group relative p-6 rounded-2xl bg-surface border border-white/5 hover:border-gold/20 transition-all duration-300 ${
                !isReady ? "opacity-70" : ""
              }`}
            >
              {/* Gradient blob */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl text-gold/40 group-hover:text-gold/60 transition-colors">
                    {section.icon}
                  </span>
                  <StatusBadge status={status} />
                </div>

                {/* Content */}
                <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-2 group-hover:text-gradient-gold transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-foreground/40 leading-relaxed">
                  {section.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 text-foreground/20 group-hover:text-gold/60 transition-colors text-sm">
                  {isReady ? "Открыть →" : "Скоро →"}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick stats */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface border border-white/5 text-center">
          <div className="font-[family-name:var(--font-playfair)] text-2xl text-gradient-gold">
            6+
          </div>
          <div className="text-xs text-foreground/40 mt-1">конкурентов</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-white/5 text-center">
          <div className="font-[family-name:var(--font-playfair)] text-2xl text-gradient-gold">
            3M+
          </div>
          <div className="text-xs text-foreground/40 mt-1">TAM (чел.)</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-white/5 text-center">
          <div className="font-[family-name:var(--font-playfair)] text-2xl text-gradient-gold">
            8
          </div>
          <div className="text-xs text-foreground/40 mt-1">каналов</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-white/5 text-center">
          <div className="font-[family-name:var(--font-playfair)] text-2xl text-gradient-gold">
            MVP
          </div>
          <div className="text-xs text-foreground/40 mt-1">фаза</div>
        </div>
      </div>
    </ResearchLayout>
  );
}
