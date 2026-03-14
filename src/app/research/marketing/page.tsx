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
  { channel: "Telegram", cac: 62, ltv: 504, roi: 8.1 },
  { channel: "Instagram", cac: 107, ltv: 504, roi: 4.7 },
  { channel: "YouTube", cac: 117, ltv: 504, roi: 4.3 },
  { channel: "Facebook", cac: 140, ltv: 504, roi: 3.6 },
  { channel: "Referral", cac: 15, ltv: 504, roi: 33.6 },
  { channel: "PR / СМИ", cac: 43, ltv: 504, roi: 11.7 },
  { channel: "SEO / Блог", cac: 42, ltv: 504, roi: 12.0 },
];

const funnelData = [
  { name: "Посетители сайта", value: 10000, fill: "rgba(255,255,255,0.08)" },
  { name: "Заявки (waitlist)", value: 3000, fill: "rgba(201,169,110,0.15)" },
  { name: "Прошли анкету", value: 1800, fill: "rgba(201,169,110,0.25)" },
  { name: "Видео-интервью", value: 720, fill: "rgba(201,169,110,0.4)" },
  { name: "Приняты (30–40%)", value: 480, fill: GOLD },
];

const revenueProjection = [
  { month: "Мес 1", mrr: 0, users: 0 },
  { month: "Мес 2", mrr: 0, users: 0 },
  { month: "Мес 3", mrr: 0, users: 0 },
  { month: "Мес 4", mrr: 3670, users: 200 },
  { month: "Мес 5", mrr: 6925, users: 350 },
  { month: "Мес 6", mrr: 11345, users: 500 },
  { month: "Мес 7", mrr: 17440, users: 700 },
  { month: "Мес 8", mrr: 23605, users: 900 },
  { month: "Мес 9", mrr: 30640, users: 1100 },
  { month: "Мес 10", mrr: 38075, users: 1300 },
  { month: "Мес 11", mrr: 48985, users: 1600 },
  { month: "Мес 12", mrr: 63700, users: 2000 },
];

const roadmap = [
  { phase: "Pre-launch", period: "Мес 1–3", tasks: ["Landing + waitlist (5,000)", "Telegram/Instagram контент", "Viral quiz запуск", "PR: VC.ru, Meduza", "Ambassador program"], status: "active" },
  { phase: "Beta Launch", period: "Мес 4–5", tasks: ["Отбор 200 участников", "Скрининг + интервью", "Первые matches", "Оффлайн event (Берлин)"], status: "planned" },
  { phase: "Growth", period: "Мес 6–9", tasks: ["Full launch (10 городов)", "Referral программа", "Product Hunt launch", "MRR → €30K"], status: "planned" },
  { phase: "Scale", period: "Мес 10–12", tasks: ["USA launch (NY, LA)", "Mobile app", "2,000 участников", "ARR → €500–760K"], status: "planned" },
];

export default function MarketingPage() {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getDocUrl("MARKETING-STRATEGY.md"))
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
        <StatCard label="Blended CAC" value="€42" icon="$" />
        <StatCard label="LTV" value="€504" change="12:1 LTV/CAC" />
        <StatCard label="MRR цель (12м)" value="€63.7K" />
        <StatCard label="Каналов" value="7" icon="◎" />
      </div>

      {/* Channel analysis + Revenue projection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="CAC по каналам" subtitle="Стоимость привлечения платящего, EUR">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis dataKey="channel" type="category" tick={{ fill: MUTED, fontSize: 11 }} width={80} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="cac" name="CAC (€)" fill={GOLD} fillOpacity={0.6} radius={[0, 4, 4, 0]}>
                {channelData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.cac < 50 ? "#4ecdc4" : entry.cac < 110 ? GOLD : "#ff6b6b"}
                    fillOpacity={0.5}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Прогноз MRR" subtitle="Проекция на 12 месяцев, EUR">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueProjection}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis yAxisId="mrr" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis yAxisId="users" orientation="right" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "11px", color: MUTED }} />
              <Line yAxisId="mrr" type="monotone" dataKey="mrr" name="MRR (€)" stroke={GOLD} strokeWidth={2} dot={{ fill: GOLD, r: 3 }} />
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
          <span>Сайт → заявка: <span className="text-gold">30%</span></span>
          <span>Заявка → анкета: <span className="text-gold">60%</span></span>
          <span>Анкета → интервью: <span className="text-gold">40%</span></span>
          <span>Acceptance rate: <span className="text-gold">30–40%</span></span>
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
              ["ARPU", "€42/мес", "Средневзвешенный по тарифам (Free/Premium/VIP/Concierge)"],
              ["CAC (blended)", "€42", "С учётом referral — €35–45"],
              ["LTV", "€504", "ARPU × 80% margin × 15 мес avg lifetime"],
              ["LTV/CAC", "12:1", "Benchmark: >3:1 — отлично"],
              ["Payback period", "1.0 мес", "Быстрый возврат за счёт premium цен"],
              ["Churn rate", "~5%/мес", "Premium аудитория = низкий churn"],
              ["Gross margin", "~80%", "Основные расходы — команда, не infrastructure"],
              ["Break-even", "Мес 8–9", "При MRR = €25,500"],
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
