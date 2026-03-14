"use client";

import { useEffect, useState } from "react";
import ResearchLayout from "@/components/research/ResearchLayout";
import MarkdownRenderer from "@/components/research/MarkdownRenderer";
import StatCard from "@/components/research/StatCard";
import ChartCard from "@/components/research/ChartCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Legend,
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

const channelPriority = [
  { channel: "Telegram-каналы", impact: 90, effort: 30, priority: "P0" },
  { channel: "Реферальная программа", impact: 85, effort: 20, priority: "P0" },
  { channel: "Instagram Reels", impact: 75, effort: 50, priority: "P1" },
  { channel: "PR / СМИ диаспоры", impact: 70, effort: 40, priority: "P1" },
  { channel: "YouTube-коллабы", impact: 65, effort: 60, priority: "P2" },
  { channel: "SEO / Блог", impact: 60, effort: 55, priority: "P2" },
  { channel: "Facebook-группы", impact: 50, effort: 35, priority: "P2" },
  { channel: "Подкасты", impact: 55, effort: 65, priority: "P3" },
];

const weeklyPlan = [
  { week: "Нед 1-2", leads: 0, actions: "Настройка каналов, контент-план, seed-аудитория" },
  { week: "Нед 3-4", leads: 50, actions: "Запуск Telegram, первые посты, outreach лидеры мнений" },
  { week: "Нед 5-6", leads: 150, actions: "Instagram запуск, PR-питчи, реферальная программа" },
  { week: "Нед 7-8", leads: 300, actions: "Коллабы, гостевые посты, первые интервью" },
  { week: "Нед 9-10", leads: 500, actions: "Масштабирование каналов, оптимизация воронки" },
  { week: "Нед 11-12", leads: 750, actions: "Ивенты, подкасты, YouTube, 500+ waitlist" },
];

const growthTimeline = weeklyPlan.map((w) => ({
  week: w.week,
  leads: w.leads,
}));

const phases = [
  {
    name: "Фаза 0: Подготовка",
    period: "Неделя 1-2",
    status: "active" as const,
    items: [
      "Telegram-канал: оформление, контент-план на 30 дней",
      "Instagram: визуальная стратегия, 9 первых постов",
      "Реферальная механика: invite-only ссылки",
      "Шаблоны outreach-писем для блогеров",
      "Waitlist landing — A/B тест заголовков",
    ],
  },
  {
    name: "Фаза 1: Seed",
    period: "Неделя 3-6",
    status: "planned" as const,
    items: [
      "3 поста/неделю в Telegram + cross-post",
      "Instagram Reels: 2/нед — истории участников",
      "Outreach 20 микро-инфлюенсеров диаспоры",
      "Гостевые посты в 3 эмигрантских медиа",
      "Email-серия для waitlist (nurturing)",
    ],
  },
  {
    name: "Фаза 2: Рост",
    period: "Неделя 7-12",
    status: "planned" as const,
    items: [
      "Реферальная программа: +1 месяц за каждого друга",
      "YouTube-интервью с психологами-основателями",
      "PR: 5 публикаций в русскоязычных СМИ",
      "Партнёрства с коммьюнити-организациями",
      "Ивент: онлайн-вечер знакомств (пилот)",
    ],
  },
  {
    name: "Фаза 3: Масштабирование",
    period: "Месяц 4-6",
    status: "planned" as const,
    items: [
      "Paid acquisition: Telegram Ads, Instagram",
      "Подкаст-коллаборации (гость у 10 подкастов)",
      "SEO: блог + лендинги по городам",
      "Амбассадорская программа по странам",
      "Оффлайн-ивенты в 3 ключевых городах",
    ],
  },
];

export default function GrowthPage() {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/docs/GROWTH-PLAYBOOK.md")
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ResearchLayout
      title="Маркетинговый Playbook"
      subtitle="Пошаговое руководство по продвижению Свои Club — от нуля до 500+ участников"
    >
      {/* Key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Каналов" value="8" icon="▶" />
        <StatCard label="Цель (12 нед)" value="750" change="заявок в waitlist" />
        <StatCard label="Бюджет старта" value="$0" change="organic first" />
        <StatCard label="Фаз" value="4" change="от seed до scale" />
      </div>

      {/* Impact vs Effort chart + Growth curve */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Приоритеты каналов" subtitle="Impact (0-100) — чем выше, тем приоритетнее">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelPriority} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis dataKey="channel" type="category" tick={{ fill: MUTED, fontSize: 10 }} width={130} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="impact" name="Impact" radius={[0, 4, 4, 0]}>
                {channelPriority.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={
                      entry.priority === "P0"
                        ? GOLD
                        : entry.priority === "P1"
                          ? "#4ecdc4"
                          : entry.priority === "P2"
                            ? "#45b7d1"
                            : MUTED
                    }
                    fillOpacity={0.6}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-foreground/40">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-gold/60" /> P0 — сразу</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#4ecdc4]/60" /> P1 — неделя 3</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#45b7d1]/60" /> P2 — неделя 7</span>
          </div>
        </ChartCard>

        <ChartCard title="Кривая роста waitlist" subtitle="Прогноз заявок за 12 недель">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "11px", color: MUTED }} />
              <Line
                type="monotone"
                dataKey="leads"
                name="Заявки (кумулятивно)"
                stroke={GOLD}
                strokeWidth={2.5}
                dot={{ fill: GOLD, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Phased roadmap */}
      <div className="mb-8">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-6 text-foreground/80">
          Пошаговый план действий
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {phases.map((phase) => (
            <div
              key={phase.name}
              className={`p-6 rounded-xl border transition-colors ${
                phase.status === "active"
                  ? "bg-gold/[0.05] border-gold/30"
                  : "bg-surface border-white/5"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {phase.status === "active" ? (
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-white/10" />
                )}
                <span className="text-xs text-foreground/40 uppercase tracking-wider">
                  {phase.period}
                </span>
              </div>
              <h4 className="font-[family-name:var(--font-playfair)] text-lg text-foreground/80 mb-3">
                {phase.name}
              </h4>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/50">
                    <span className="text-gold/40 mt-0.5 text-[8px]">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly execution table */}
      <div className="mb-8 overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead className="bg-surface-light border-b border-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Период
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Заявки (цель)
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Ключевые действия
              </th>
            </tr>
          </thead>
          <tbody>
            {weeklyPlan.map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 border-t border-white/[0.03] text-foreground/80 font-medium">
                  {row.week}
                </td>
                <td className="px-4 py-3 border-t border-white/[0.03] text-gold/80 font-mono">
                  {row.leads}
                </td>
                <td className="px-4 py-3 border-t border-white/[0.03] text-foreground/50">
                  {row.actions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Markdown content */}
      {loading ? (
        <div className="flex items-center gap-3 p-8 rounded-xl bg-surface border border-white/5 text-foreground/40">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          Загружаем playbook...
        </div>
      ) : markdown ? (
        <div className="p-6 sm:p-8 rounded-xl bg-surface border border-white/5">
          <MarkdownRenderer content={markdown} />
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-surface border border-white/5 text-center text-foreground/30">
          <p className="text-lg mb-2">Playbook в разработке</p>
          <p className="text-sm">
            Агент пишет пошаговое руководство. Обновите страницу через пару минут.
          </p>
        </div>
      )}
    </ResearchLayout>
  );
}
