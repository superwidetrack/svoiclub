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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const GOLD = "#c9a96e";
const GOLD_LIGHT = "#d4b87a";
const MUTED = "#8a8a8a";

const pricingData = [
  { name: "SoulMatcher", price: 150, label: "$150/мес" },
  { name: "Luxy Black", price: 99, label: "$99/мес" },
  { name: "HingeX", price: 50, label: "$50/мес" },
  { name: "Inner Circle", price: 40, label: "$40/мес" },
  { name: "Hinge+", price: 35, label: "$35/мес" },
  { name: "Bumble Pr.", price: 33, label: "$33/мес" },
  { name: "RusDate", price: 24, label: "$24/мес" },
  { name: "Raya", price: 10, label: "$10/мес" },
];

const radarData = [
  { feature: "Скрининг", Tawkify: 95, SoulMatcher: 80, RusDate: 20, SvoiClub: 90 },
  { feature: "UX", Tawkify: 60, SoulMatcher: 75, RusDate: 30, SvoiClub: 80 },
  { feature: "Матчинг", Tawkify: 90, SoulMatcher: 85, RusDate: 20, SvoiClub: 90 },
  { feature: "Комьюнити", Tawkify: 30, SoulMatcher: 50, RusDate: 40, SvoiClub: 80 },
  { feature: "Нишевость", Tawkify: 40, SoulMatcher: 60, RusDate: 85, SvoiClub: 95 },
  { feature: "Психология", Tawkify: 70, SoulMatcher: 90, RusDate: 5, SvoiClub: 95 },
];

const marketShareData = [
  { name: "Tinder (Match Group)", value: 38, color: "#ff6b6b" },
  { name: "Bumble", value: 18, color: "#ffa07a" },
  { name: "Hinge", value: 18, color: "#4ecdc4" },
  { name: "Niche / Curated", value: 15, color: "#45b7d1" },
  { name: "Matchmaking", value: 6, color: GOLD },
  { name: "Other", value: 5, color: MUTED },
];

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#f5f0eb",
    fontSize: "12px",
  },
};

export default function CompetitorsPage() {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getDocUrl("COMPETITORS.md"))
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ResearchLayout
      title="Анализ конкурентов"
      subtitle="Ландшафт premium dating-сервисов и matchmaking-платформ"
    >
      {/* Key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Конкурентов" value="20+" icon="◈" />
        <StatCard label="Рынок (2025)" value="$11B" change="+7.3% CAGR" icon="$" />
        <StatCard label="Premium сегмент" value="$1.2B" change="+9.5% CAGR" icon="◆" />
        <StatCard label="Наша ниша" value="Свободна" icon="◇" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Ценообразование конкурентов" subtitle="Подписки приложений, USD/мес (мэтчмейкинг-агентства: $1,500–$300K отдельно)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={pricingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="name"
                tick={{ fill: MUTED, fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              />
              <YAxis
                tick={{ fill: MUTED, fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="price" radius={[6, 6, 0, 0]}>
                {pricingData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.name === "SoulMatcher" ? GOLD : "rgba(255,255,255,0.15)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Сравнение по параметрам" subtitle="Оценка 0–100">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis
                dataKey="feature"
                tick={{ fill: MUTED, fontSize: 10 }}
              />
              <Radar
                name="Свои Club"
                dataKey="SvoiClub"
                stroke={GOLD}
                fill={GOLD}
                fillOpacity={0.2}
              />
              <Radar
                name="Tawkify"
                dataKey="Tawkify"
                stroke="#ff6b6b"
                fill="#ff6b6b"
                fillOpacity={0.05}
              />
              <Radar
                name="SoulMatcher"
                dataKey="SoulMatcher"
                stroke="#4ecdc4"
                fill="#4ecdc4"
                fillOpacity={0.05}
              />
              <Radar
                name="RusDate"
                dataKey="RusDate"
                stroke="#ffa07a"
                fill="#ffa07a"
                fillOpacity={0.05}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", color: MUTED }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Market share */}
      <ChartCard
        title="Доли рынка онлайн-знакомств"
        subtitle="Глобальный рынок, 2025"
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={marketShareData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {marketShareData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 shrink-0">
            {marketShareData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-sm">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: d.color }}
                />
                <span className="text-foreground/50">
                  {d.name} — {d.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </ChartCard>

      {/* Competitor comparison table */}
      <div className="mb-8 overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead className="bg-surface-light border-b border-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Сервис
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Модель
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Скрининг
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Целевая аудитория
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Наше преимущество
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["RusDate", "Freemium", "Модерация фото", "Эмигранты", "Интервью + психология + ценности"],
              ["Tawkify", "Matchmaking", "Анкета + звонок", "Все, США", "Культурный фокус + доступная цена"],
              ["SoulMatcher", "Premium club", "Заявка + AI", "Профессионалы", "Русский язык + эмигрантский контекст"],
              ["Maclynn", "Psychology-led", "Интервью + PhD", "UHNW", "Доступнее в 100x при схожем подходе"],
              ["Hinge", "Mass market", "Нет", "25–35, все", "Ручной подбор + скрининг vs алгоритм"],
              ["Inner Circle", "Curated app", "LinkedIn-check", "Городские профи", "Глубже, чем формальный скрининг"],
              ["Telegram группы", "Бесплатно", "Нет", "Эмигранты", "Безопасность + верификация + качество"],
            ].map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3 border-t border-white/[0.03] ${
                      j === 0
                        ? "text-foreground/80 font-medium"
                        : j === 4
                          ? "text-gold/70"
                          : "text-foreground/50"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Markdown content */}
      {loading ? (
        <div className="flex items-center gap-3 p-8 rounded-xl bg-surface border border-white/5 text-foreground/40">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          Загружаем материалы исследования...
        </div>
      ) : markdown ? (
        <div className="p-6 sm:p-8 rounded-xl bg-surface border border-white/5">
          <MarkdownRenderer content={markdown} />
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-surface border border-white/5 text-center text-foreground/30">
          <p className="text-lg mb-2">Исследование в процессе</p>
          <p className="text-sm">
            Агент анализирует конкурентов. Обновите страницу через пару минут.
          </p>
        </div>
      )}
    </ResearchLayout>
  );
}
