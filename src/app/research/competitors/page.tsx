"use client";

import { useEffect, useState } from "react";
import ResearchLayout from "@/components/research/ResearchLayout";
import MarkdownRenderer from "@/components/research/MarkdownRenderer";
import ChartCard from "@/components/research/ChartCard";
import StatCard from "@/components/research/StatCard";
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
  { name: "Tawkify", price: 99, label: "$99/мес" },
  { name: "Luxy", price: 59, label: "$59/мес" },
  { name: "Inner Circle", price: 40, label: "$40/мес" },
  { name: "Raya", price: 8, label: "$8/мес" },
  { name: "Hinge+", price: 50, label: "$50/мес" },
  { name: "Свои Club", price: 49, label: "$49/мес" },
];

const radarData = [
  { feature: "Скрининг", Tawkify: 95, InnerCircle: 70, Raya: 90, SvoiClub: 85 },
  { feature: "UX", Tawkify: 60, InnerCircle: 85, Raya: 90, SvoiClub: 80 },
  { feature: "Матчинг", Tawkify: 90, InnerCircle: 50, Raya: 40, SvoiClub: 85 },
  { feature: "Комьюнити", Tawkify: 30, InnerCircle: 80, Raya: 95, SvoiClub: 75 },
  { feature: "Нишевость", Tawkify: 40, InnerCircle: 50, Raya: 60, SvoiClub: 95 },
  { feature: "Психология", Tawkify: 70, InnerCircle: 20, Raya: 10, SvoiClub: 95 },
];

const marketShareData = [
  { name: "Tinder/Bumble", value: 45, color: "#ff6b6b" },
  { name: "Hinge", value: 20, color: "#4ecdc4" },
  { name: "Niche apps", value: 15, color: "#45b7d1" },
  { name: "Matchmaking", value: 12, color: GOLD },
  { name: "Other", value: 8, color: MUTED },
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
    fetch("/api/docs/COMPETITORS.md")
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
        <StatCard label="Конкурентов" value="6+" icon="◈" />
        <StatCard label="Средний чек" value="$51" change="+15% YoY" icon="$" />
        <StatCard label="Рынок" value="$9.6B" change="+8.3% CAGR" icon="◆" />
        <StatCard label="Наша ниша" value="Свободна" icon="◇" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Ценообразование конкурентов" subtitle="Ежемесячная подписка, USD">
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
                    fill={entry.name === "Свои Club" ? GOLD : "rgba(255,255,255,0.1)"}
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
                name="Raya"
                dataKey="Raya"
                stroke="#4ecdc4"
                fill="#4ecdc4"
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
              ["Tawkify", "Matchmaking", "Анкета + звонок", "Все, США", "Культурный фокус + психология"],
              ["Luxy", "Luxury swipe", "Верификация дохода", "Богатые", "Не про деньги, а про ценности"],
              ["Inner Circle", "Curated app", "Соцсети-скрининг", "Городские профи", "Глубже, чем LinkedIn-check"],
              ["Raya", "Exclusive app", "Комитет отбора", "Креативные", "Нишевое комьюнити, не элитизм"],
              ["Hinge", "Mass market", "Нет", "Все", "Ручной подбор vs алгоритм"],
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
