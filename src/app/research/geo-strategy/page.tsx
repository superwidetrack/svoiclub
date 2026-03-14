"use client";

import { useEffect, useState } from "react";
import ResearchLayout from "@/components/research/ResearchLayout";
import MarkdownRenderer from "@/components/research/MarkdownRenderer";
import ChartCard from "@/components/research/ChartCard";
import StatCard from "@/components/research/StatCard";
import { getDocUrl } from "@/lib/docs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  Cell,
} from "recharts";

const GOLD = "#c9a96e";
const MUTED = "#8a8a8a";

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#f5f0eb",
    fontSize: "12px",
  },
};

const diasporaByRegion = [
  { region: "США", size: 3500, wtp: 65, singles: 900, color: "#ff6b6b" },
  { region: "Германия", size: 3000, wtp: 45, singles: 750, color: GOLD },
  { region: "Израиль", size: 1300, wtp: 40, singles: 600, color: "#4ecdc4" },
  { region: "Канада", size: 622, wtp: 55, singles: 500, color: "#45b7d1" },
  { region: "ОАЭ", size: 500, wtp: 80, singles: 500, color: "#e67e22" },
  { region: "Турция", size: 500, wtp: 25, singles: 300, color: "#9b59b6" },
  { region: "UK", size: 300, wtp: 60, singles: 250, color: "#2ecc71" },
  { region: "Грузия", size: 112, wtp: 20, singles: 80, color: "#f39c12" },
];

const regionComparison = [
  { dimension: "Размер диаспоры", USA: 95, Europe: 80, Israel: 60, Global: 70 },
  { dimension: "Платёжеспособность", USA: 90, Europe: 70, Israel: 55, Global: 60 },
  { dimension: "Потребность", USA: 75, Europe: 85, Israel: 70, Global: 80 },
  { dimension: "Конкуренция", USA: 85, Europe: 40, Israel: 50, Global: 45 },
  { dimension: "Доступность", USA: 70, Europe: 90, Israel: 80, Global: 75 },
  { dimension: "Культурная связь", USA: 65, Europe: 75, Israel: 90, Global: 70 },
];

const wtpData = [
  { region: "ОАЭ", wtp: 80 },
  { region: "США", wtp: 65 },
  { region: "UK", wtp: 60 },
  { region: "Канада", wtp: 55 },
  { region: "Германия", wtp: 45 },
  { region: "Израиль", wtp: 40 },
  { region: "Турция", wtp: 25 },
  { region: "Грузия", wtp: 20 },
];

const prosCons = [
  {
    region: "США",
    pros: [
      "Крупнейшая диаспора (3.5M)",
      "Высокая платёжеспособность",
      "Привычка платить за dating-apps",
      "Развитая инфраструктура matchmaking",
    ],
    cons: [
      "Максимальная конкуренция",
      "Высокий CAC ($100+)",
      "Географическая дисперсия",
      "Насыщение рынка dating",
    ],
  },
  {
    region: "Европа (DACH + UK)",
    pros: [
      "Компактная диаспора (3.3M суммарно)",
      "Низкая конкуренция в нише",
      "Высокий запрос на «своих»",
      "Доступные каналы (Telegram)",
    ],
    cons: [
      "Средняя WTP ($45-60/мес)",
      "Языковое разнообразие",
      "GDPR-регулирование",
      "Разные культурные контексты",
    ],
  },
  {
    region: "Израиль",
    pros: [
      "Плотная русскоязычная диаспора",
      "Сильная культурная идентичность",
      "Компактная география",
      "Активный dating-рынок",
    ],
    cons: [
      "Средняя WTP ($40/мес)",
      "Локальные конкуренты",
      "Специфика рынка",
      "Ограниченный масштаб",
    ],
  },
];

export default function GeoStrategyPage() {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getDocUrl("GEO-STRATEGY.md"))
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ResearchLayout
      title="География запуска"
      subtitle="Сравнительный анализ регионов: США, Европа, Израиль и глобальная стратегия"
    >
      {/* Key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Регионов" value="8+" icon="◐" />
        <StatCard label="Диаспора" value="10M+" change="русскоязычных за рубежом" />
        <StatCard label="Top WTP" value="$80" change="ОАЭ / мес" />
        <StatCard label="Рекомендация" value="EU-first" change="Европа → США" />
      </div>

      {/* Recommendation highlight */}
      <div className="mb-8 p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/[0.07] to-surface">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-gold text-lg">★</span>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg text-gradient-gold mb-2">
              Рекомендация: Europe-first стратегия
            </h3>
            <p className="text-sm text-foreground/50 leading-relaxed">
              Начать с Германии и DACH-региона (низкая конкуренция, компактная диаспора, доступные каналы),
              затем расширяться в UK и Израиль. США — фаза 3, после валидации модели и накопления social proof.
              ОАЭ — premium-сегмент для монетизации.
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Размер диаспоры по регионам" subtitle="Русскоязычные, тыс. чел.">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={diasporaByRegion} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis dataKey="region" type="category" tick={{ fill: MUTED, fontSize: 11 }} width={70} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="size" name="Диаспора (тыс.)" radius={[0, 4, 4, 0]}>
                {diasporaByRegion.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.6} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Сравнение регионов" subtitle="Многомерная оценка (0-100)">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={regionComparison}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: MUTED, fontSize: 9 }} />
              <Radar name="Европа" dataKey="Europe" stroke={GOLD} fill={GOLD} fillOpacity={0.2} />
              <Radar name="США" dataKey="USA" stroke="#ff6b6b" fill="#ff6b6b" fillOpacity={0.05} />
              <Radar name="Израиль" dataKey="Israel" stroke="#4ecdc4" fill="#4ecdc4" fillOpacity={0.05} />
              <Legend wrapperStyle={{ fontSize: "11px", color: MUTED }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* WTP comparison */}
      <ChartCard title="Готовность платить (WTP)" subtitle="Максимальная цена подписки, $/мес" className="mb-8">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={wtpData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="region" tick={{ fill: MUTED, fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
            <YAxis tick={{ fill: MUTED, fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="wtp" name="WTP ($/мес)" radius={[6, 6, 0, 0]}>
              {wtpData.map((entry, i) => (
                <Cell key={i} fill={entry.wtp >= 55 ? GOLD : "rgba(255,255,255,0.1)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Pro/Con tables */}
      <div className="mb-8">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-6 text-foreground/80">
          Плюсы и минусы по регионам
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {prosCons.map((item) => (
            <div key={item.region} className="p-5 rounded-xl bg-surface border border-white/5">
              <h4 className="font-[family-name:var(--font-playfair)] text-lg text-foreground/80 mb-4 pb-2 border-b border-white/5">
                {item.region}
              </h4>
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-emerald-400/70 uppercase tracking-wider font-medium">
                    Плюсы
                  </span>
                  <ul className="mt-2 space-y-1.5">
                    {item.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs text-foreground/50">
                        <span className="text-emerald-400/50 mt-0.5">+</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs text-red-400/70 uppercase tracking-wider font-medium">
                    Минусы
                  </span>
                  <ul className="mt-2 space-y-1.5">
                    {item.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-xs text-foreground/50">
                        <span className="text-red-400/50 mt-0.5">−</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Markdown content */}
      {loading ? (
        <div className="flex items-center gap-3 p-8 rounded-xl bg-surface border border-white/5 text-foreground/40">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          Загружаем географический анализ...
        </div>
      ) : markdown ? (
        <div className="p-6 sm:p-8 rounded-xl bg-surface border border-white/5">
          <MarkdownRenderer content={markdown} />
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-surface border border-white/5 text-center text-foreground/30">
          <p className="text-lg mb-2">Исследование в процессе</p>
          <p className="text-sm">
            Агент анализирует географию рынка. Обновите страницу через пару минут.
          </p>
        </div>
      )}
    </ResearchLayout>
  );
}
