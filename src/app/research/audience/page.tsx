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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Treemap,
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

const geographyData = [
  { country: "США", population: 3500000, target: 900000 },
  { country: "Германия", population: 3000000, target: 750000 },
  { country: "Израиль", population: 1300000, target: 600000 },
  { country: "Канада", population: 622000, target: 500000 },
  { country: "ОАЭ", population: 500000, target: 500000 },
  { country: "Турция", population: 500000, target: 300000 },
  { country: "UK", population: 300000, target: 250000 },
  { country: "Грузия", population: 112000, target: 80000 },
  { country: "Сербия", population: 110000, target: 120000 },
  { country: "Кипр", population: 80000, target: 60000 },
];

const ageData = [
  { age: "18-24", percent: 15, color: "#45b7d1" },
  { age: "25-29", percent: 22, color: GOLD },
  { age: "30-34", percent: 26, color: "#c9a96e" },
  { age: "35-39", percent: 22, color: "#b8944f" },
  { age: "40-45", percent: 16, color: "#8a7040" },
];

const professionData = [
  { name: "IT / Tech", size: 25, fill: GOLD },
  { name: "Культура / Медиа", size: 15, fill: "#9b59b6" },
  { name: "Финансы", size: 12, fill: "#b8944f" },
  { name: "Наука / Образование", size: 10, fill: "#4ecdc4" },
  { name: "Предприниматели", size: 10, fill: "#ff6b6b" },
  { name: "Корпоративные", size: 20, fill: "#45b7d1" },
  { name: "Другое", size: 8, fill: "#8a8a8a" },
];

const tamSamSom = [
  { metric: "TAM", value: 1450000, label: "1.45M чел.", desc: "Одинокие русскоязычные 25-45 за рубежом" },
  { metric: "SAM", value: 196000, label: "196K чел.", desc: "Готовы к premium русскоязычному сервису" },
  { metric: "SOM", value: 35000, label: "35K чел.", desc: "Реально достижимые за 3 года" },
];

const growthData = [
  { year: "2020", emigrants: 60 },
  { year: "2021", emigrants: 80 },
  { year: "2022", emigrants: 668 },
  { year: "2023", emigrants: 450 },
  { year: "2024", emigrants: 109 },
  { year: "2025", emigrants: 97 },
  { year: "2026*", emigrants: 85 },
];

// Custom content for treemap
function CustomTreemapContent(props: {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  size: number;
  fill: string;
}) {
  const { x, y, width, height, name, size, fill } = props;
  if (width < 50 || height < 30) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} fillOpacity={0.3} stroke="rgba(255,255,255,0.05)" strokeWidth={1} rx={4} />
      <text x={x + width / 2} y={y + height / 2 - 6} textAnchor="middle" fill="#f5f0eb" fontSize={11} fontWeight={500}>
        {name}
      </text>
      <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill="rgba(245,240,235,0.4)" fontSize={10}>
        {size}%
      </text>
    </g>
  );
}

export default function AudiencePage() {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/docs/AUDIENCE.md")
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ResearchLayout
      title="Целевая аудитория"
      subtitle="Демографический и психографический анализ русскоязычной диаспоры"
    >
      {/* TAM / SAM / SOM */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {tamSamSom.map((item) => (
          <div
            key={item.metric}
            className="p-5 rounded-xl bg-surface border border-white/5 hover:border-gold/20 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gold font-mono font-bold">
                {item.metric}
              </span>
              <span className="text-xs text-foreground/30">—</span>
              <span className="text-xs text-foreground/40">{item.desc}</span>
            </div>
            <div className="font-[family-name:var(--font-playfair)] text-3xl text-gradient-gold">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Стран" value="18" icon="◉" />
        <StatCard label="Ядро 25-35" value="48%" change="ср. возраст 32" />
        <StatCard label="С высш. обр." value="80%" change="vs 27% по РФ" />
        <StatCard label="Одиноки" value="52%" change="ищут пару" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Geography */}
        <ChartCard
          title="География диаспоры"
          subtitle="Русскоязычное население и целевая аудитория 25-45"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={geographyData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis dataKey="country" type="category" tick={{ fill: MUTED, fontSize: 11 }} width={80} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="population" name="Всего" fill="rgba(255,255,255,0.08)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="target" name="Целевая" fill={GOLD} fillOpacity={0.7} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Age distribution */}
        <ChartCard
          title="Возрастное распределение"
          subtitle="Целевая аудитория по возрастным группам"
        >
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="percent"
                >
                  {ageData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} fillOpacity={0.7} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 shrink-0">
              {ageData.map((d) => (
                <div key={d.age} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color, opacity: 0.7 }} />
                  <span className="text-foreground/50">{d.age}: {d.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Professions treemap + Emigration wave */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Профессии" subtitle="Распределение по отраслям, %">
          <ResponsiveContainer width="100%" height={250}>
            <Treemap
              data={professionData}
              dataKey="size"
              aspectRatio={4 / 3}
              content={<CustomTreemapContent x={0} y={0} width={0} height={0} name="" size={0} fill="" />}
            />
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Волна эмиграции"
          subtitle="Официальная эмиграция из РФ, тыс. чел./год"
        >
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" tick={{ fill: MUTED, fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis tick={{ fill: MUTED, fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <Tooltip {...tooltipStyle} />
              <Area
                type="monotone"
                dataKey="emigrants"
                stroke={GOLD}
                fill={GOLD}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Psychographic cards */}
      <div className="mb-8">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-4 text-foreground/80">
          Психографический портрет
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Ценности", items: ["Свобода и автономия (92%)", "Интеллектуальная среда (85%)", "Общие культурные коды (82%)", "Семья и отношения (76%)"] },
            { title: "Боли", items: ["29% часто чувствуют одиночество", "72% недовольны dating-apps", "Языковой барьер в романтике", "28% планируют снова переехать"] },
            { title: "Ожидания", items: ["Верификация и screening (критично)", "Психологическая совместимость", "Кросс-страновой matching", "Community, не просто app"] },
          ].map((block) => (
            <div key={block.title} className="p-5 rounded-xl bg-surface border border-white/5">
              <h4 className="text-sm font-medium text-gold/70 uppercase tracking-wider mb-3">
                {block.title}
              </h4>
              <ul className="space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/50">
                    <span className="text-gold/40 mt-1 text-[8px]">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
          <p className="text-sm">Агент анализирует аудиторию. Обновите страницу через пару минут.</p>
        </div>
      )}
    </ResearchLayout>
  );
}
