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
  LineChart,
  Line,
  Legend,
  FunnelChart,
  Funnel,
  LabelList,
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

const channelData = [
  { channel: "Telegram", cac: 12, ltv: 180, roi: 15 },
  { channel: "Instagram", cac: 25, ltv: 160, roi: 6.4 },
  { channel: "YouTube", cac: 35, ltv: 200, roi: 5.7 },
  { channel: "Подкасты", cac: 40, ltv: 220, roi: 5.5 },
  { channel: "Referral", cac: 8, ltv: 250, roi: 31 },
  { channel: "PR / СМИ", cac: 15, ltv: 170, roi: 11 },
  { channel: "Events", cac: 50, ltv: 190, roi: 3.8 },
  { channel: "SEO", cac: 18, ltv: 150, roi: 8.3 },
];

const funnelData = [
  { name: "Посетители сайта", value: 10000, fill: "rgba(255,255,255,0.08)" },
  { name: "Заявки", value: 3000, fill: "rgba(201,169,110,0.15)" },
  { name: "Прошли анкету", value: 1800, fill: "rgba(201,169,110,0.25)" },
  { name: "Интервью", value: 900, fill: "rgba(201,169,110,0.4)" },
  { name: "Приняты", value: 600, fill: GOLD },
];

const revenueProjection = [
  { month: "Мес 1", mrr: 0, users: 50 },
  { month: "Мес 2", mrr: 2450, users: 120 },
  { month: "Мес 3", mrr: 6860, users: 210 },
  { month: "Мес 4", mrr: 12250, users: 320 },
  { month: "Мес 5", mrr: 17640, users: 430 },
  { month: "Мес 6", mrr: 24500, users: 560 },
  { month: "Мес 9", mrr: 44100, users: 900 },
  { month: "Мес 12", mrr: 73500, users: 1500 },
];

const roadmap = [
  { phase: "Pre-launch", period: "Мес 1-2", tasks: ["Landing page", "Waitlist 500+", "Контент в Telegram", "Пилотные интервью"], status: "active" },
  { phase: "Soft Launch", period: "Мес 3-4", tasks: ["Первые 100 участников", "Beta-матчинг", "Сбор отзывов", "Instagram-контент"], status: "planned" },
  { phase: "Growth", period: "Мес 5-8", tasks: ["Реферальная программа", "PR-кампания", "Подкаст-коллабы", "500+ участников"], status: "planned" },
  { phase: "Scale", period: "Мес 9-12", tasks: ["Монетизация", "Mobile app (v1)", "Экспансия в новые страны", "1500+ участников"], status: "planned" },
];

export default function MarketingPage() {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/docs/MARKETING-STRATEGY.md")
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ResearchLayout
      title="Маркетинговая стратегия"
      subtitle="Каналы привлечения, unit economics и roadmap запуска"
    >
      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Target CAC" value="$15" icon="$" />
        <StatCard label="LTV" value="$180" change="12:1 LTV/CAC" />
        <StatCard label="MRR цель (12м)" value="$73.5K" />
        <StatCard label="Каналов" value="8" icon="◎" />
      </div>

      {/* Channel analysis + Revenue projection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="CAC по каналам" subtitle="Стоимость привлечения, USD">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis dataKey="channel" type="category" tick={{ fill: MUTED, fontSize: 11 }} width={80} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="cac" name="CAC ($)" fill={GOLD} fillOpacity={0.6} radius={[0, 4, 4, 0]}>
                {channelData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.cac < 20 ? "#4ecdc4" : entry.cac < 35 ? GOLD : "#ff6b6b"}
                    fillOpacity={0.5}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Прогноз MRR" subtitle="Проекция на 12 месяцев, USD">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueProjection}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis yAxisId="mrr" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis yAxisId="users" orientation="right" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "11px", color: MUTED }} />
              <Line yAxisId="mrr" type="monotone" dataKey="mrr" name="MRR ($)" stroke={GOLD} strokeWidth={2} dot={{ fill: GOLD, r: 3 }} />
              <Line yAxisId="users" type="monotone" dataKey="users" name="Пользователи" stroke="#4ecdc4" strokeWidth={2} dot={{ fill: "#4ecdc4", r: 3 }} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Funnel */}
      <ChartCard title="Воронка конверсии" subtitle="От посетителя до участника" className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <FunnelChart>
            <Tooltip {...tooltipStyle} />
            <Funnel dataKey="value" data={funnelData} isAnimationActive>
              {funnelData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
              <LabelList position="right" fill="#f5f0eb" fontSize={11} />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-8 mt-4 text-xs text-foreground/40">
          <span>Конверсия сайт→заявка: <span className="text-gold">30%</span></span>
          <span>Заявка→интервью: <span className="text-gold">50%</span></span>
          <span>Интервью→приняты: <span className="text-gold">67%</span></span>
        </div>
      </ChartCard>

      {/* Roadmap */}
      <div className="mb-8">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-6 text-foreground/80">
          Roadmap запуска
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roadmap.map((phase) => (
            <div
              key={phase.phase}
              className={`p-5 rounded-xl border transition-colors ${
                phase.status === "active"
                  ? "bg-gold/5 border-gold/30"
                  : "bg-surface border-white/5"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {phase.status === "active" ? (
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-white/10" />
                )}
                <span className="text-xs text-foreground/40 uppercase tracking-wider">
                  {phase.period}
                </span>
              </div>
              <h4 className="font-medium text-foreground/80 mb-3">
                {phase.phase}
              </h4>
              <ul className="space-y-1.5">
                {phase.tasks.map((task) => (
                  <li key={task} className="flex items-start gap-2 text-xs text-foreground/40">
                    <span className="text-gold/40 mt-0.5 text-[6px]">●</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Unit economics table */}
      <div className="mb-8 overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead className="bg-surface-light border-b border-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Метрика</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Значение</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["ARPU", "$49/мес", "Средний чек подписки"],
              ["CAC (blended)", "$15", "Средневзвешенный по каналам"],
              ["LTV", "$180", "Средний срок подписки ~4 мес"],
              ["LTV/CAC", "12:1", "Здоровый показатель (>3:1)"],
              ["Payback period", "0.3 мес", "Быстрый возврат инвестиций"],
              ["Churn rate", "~25%/мес", "Высокий для dating (норма)"],
              ["Gross margin", "~85%", "Low marginal cost"],
            ].map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 border-t border-white/[0.03] text-foreground/80 font-medium">{row[0]}</td>
                <td className="px-4 py-3 border-t border-white/[0.03] text-gold/80 font-mono">{row[1]}</td>
                <td className="px-4 py-3 border-t border-white/[0.03] text-foreground/40">{row[2]}</td>
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
          <p className="text-sm">Агент разрабатывает маркетинговую стратегию. Обновите страницу через пару минут.</p>
        </div>
      )}
    </ResearchLayout>
  );
}
