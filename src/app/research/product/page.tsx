"use client";

import { useEffect, useState } from "react";
import ResearchLayout from "@/components/research/ResearchLayout";
import MarkdownRenderer from "@/components/research/MarkdownRenderer";
import ChartCard from "@/components/research/ChartCard";
import StatCard from "@/components/research/StatCard";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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

const matchingDimensions = [
  { dimension: "Ценности", weight: 25 },
  { dimension: "Привязанность", weight: 20 },
  { dimension: "Жизн. этап", weight: 18 },
  { dimension: "Эмоц. интеллект", weight: 15 },
  { dimension: "Культурный код", weight: 12 },
  { dimension: "Интересы", weight: 10 },
];

const compatibilityProfile = [
  { trait: "Открытость", user1: 85, user2: 78 },
  { trait: "Стабильность", user1: 70, user2: 75 },
  { trait: "Амбиции", user1: 90, user2: 88 },
  { trait: "Эмпатия", user1: 82, user2: 85 },
  { trait: "Автономия", user1: 65, user2: 70 },
  { trait: "Традиции", user1: 55, user2: 60 },
];

const questionnaireCategories = [
  {
    category: "Ценности и приоритеты",
    questions: 12,
    examples: ["Что для вас означает «успех» в жизни?", "Как вы видите баланс карьеры и семьи?", "Что вы готовы отстаивать в отношениях?"],
  },
  {
    category: "Стиль привязанности",
    questions: 8,
    examples: ["Как вы переживаете конфликты в паре?", "Что помогает вам чувствовать себя любимым/ой?", "Как вы выражаете заботу?"],
  },
  {
    category: "Эмигрантский контекст",
    questions: 6,
    examples: ["Планируете ли вы вернуться на родину?", "Как эмиграция изменила ваши ценности?", "Язык общения дома: русский или другой?"],
  },
  {
    category: "Психологическая зрелость",
    questions: 10,
    examples: ["Как вы справляетесь со стрессом?", "Опишите ваш опыт с терапией", "Что вы узнали из прошлых отношений?"],
  },
];

const uxFlowSteps = [
  { step: 1, name: "Заявка на сайте", desc: "Email + страна + возраст", duration: "2 мин", icon: "📝" },
  { step: 2, name: "Подробная анкета", desc: "36 вопросов в 4 блоках", duration: "20 мин", icon: "📋" },
  { step: 3, name: "Психотест", desc: "Attachment + EQ assessment", duration: "15 мин", icon: "🧠" },
  { step: 4, name: "Видео-интервью", desc: "15-20 мин с куратором", duration: "20 мин", icon: "🎥" },
  { step: 5, name: "Профиль", desc: "Создание внутреннего профиля", duration: "10 мин", icon: "👤" },
  { step: 6, name: "Матчинг", desc: "Ручной подбор + алгоритм", duration: "1-7 дней", icon: "💎" },
  { step: 7, name: "Знакомство", desc: "Intro от куратора + обмен контактами", duration: "—", icon: "💫" },
  { step: 8, name: "Фидбэк", desc: "Обратная связь после встречи", duration: "5 мин", icon: "📊" },
];

export default function ProductPage() {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/docs/PRODUCT-DESIGN.md")
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ResearchLayout
      title="Продуктовый дизайн"
      subtitle="Опросник, UX-флоу, модель совместимости и MVP-скоуп"
    >
      {/* Key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Вопросов" value="36" icon="◇" />
        <StatCard label="Параметров матча" value="6" />
        <StatCard label="Время онбординга" value="~60 мин" />
        <StatCard label="MVP готовность" value="4 нед." />
      </div>

      {/* Matching model */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Весы модели совместимости" subtitle="Относительный вклад каждого параметра, %">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={matchingDimensions}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="dimension" tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <YAxis tick={{ fill: MUTED, fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.05)" }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="weight" name="Вес (%)" radius={[6, 6, 0, 0]}>
                {matchingDimensions.map((_, i) => (
                  <Cell key={i} fill={GOLD} fillOpacity={0.3 + i * 0.12} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Пример профиля совместимости" subtitle="Радар двух потенциальных пар">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={compatibilityProfile}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="trait" tick={{ fill: MUTED, fontSize: 10 }} />
              <Radar name="Участник А" dataKey="user1" stroke={GOLD} fill={GOLD} fillOpacity={0.2} />
              <Radar name="Участник Б" dataKey="user2" stroke="#4ecdc4" fill="#4ecdc4" fillOpacity={0.1} />
              <Tooltip {...tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-2 text-xs text-foreground/40">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-gold inline-block" /> Участник А
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#4ecdc4] inline-block" /> Участник Б
            </span>
            <span className="text-gold">Совместимость: 87%</span>
          </div>
        </ChartCard>
      </div>

      {/* UX Flow */}
      <div className="mb-8">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-6 text-foreground/80">
          UX-флоу: путь участника
        </h3>
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {uxFlowSteps.map((step) => (
              <div
                key={step.step}
                className="relative p-5 rounded-xl bg-surface border border-white/5 hover:border-gold/20 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-[10px] text-gold font-mono">
                    {step.step}
                  </span>
                  <span className="text-xs text-foreground/30">{step.duration}</span>
                </div>
                <div className="text-lg mb-1">{step.icon}</div>
                <h4 className="font-medium text-foreground/80 text-sm mb-1">
                  {step.name}
                </h4>
                <p className="text-xs text-foreground/40">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Questionnaire preview */}
      <div className="mb-8">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-6 text-foreground/80">
          Структура опросника
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {questionnaireCategories.map((cat) => (
            <div
              key={cat.category}
              className="p-5 rounded-xl bg-surface border border-white/5 hover:border-gold/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground/80">
                  {cat.category}
                </h4>
                <span className="text-xs text-gold/60 bg-gold/10 px-2 py-0.5 rounded-full">
                  {cat.questions} вопросов
                </span>
              </div>
              <ul className="space-y-2">
                {cat.examples.map((q) => (
                  <li
                    key={q}
                    className="text-xs text-foreground/40 leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-gold/30 mt-0.5 text-[8px]">●</span>
                    <span className="italic">&ldquo;{q}&rdquo;</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* MVP scope */}
      <div className="mb-8 p-6 rounded-xl bg-surface border border-white/5">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-4 text-foreground/80">
          MVP скоуп
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-emerald-400/70 mb-2 uppercase tracking-wider">
              Must have
            </h4>
            <ul className="space-y-1.5">
              {["Landing + waitlist", "Анкета (Google Forms)", "Видео-интервью (Zoom)", "Ручной матчинг", "Telegram-бот уведомлений", "CRM (Notion)"].map((item) => (
                <li key={item} className="text-xs text-foreground/50 flex items-center gap-2">
                  <span className="text-emerald-400/50">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gold/70 mb-2 uppercase tracking-wider">
              Should have
            </h4>
            <ul className="space-y-1.5">
              {["Личный кабинет", "Автоматический тест", "Алгоритм подбора v1", "Встроенный чат", "Аналитика матчей"].map((item) => (
                <li key={item} className="text-xs text-foreground/50 flex items-center gap-2">
                  <span className="text-gold/50">○</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground/30 mb-2 uppercase tracking-wider">
              Nice to have
            </h4>
            <ul className="space-y-1.5">
              {["Mobile app", "AI-подбор v2", "Video dates", "Комьюнити-ивенты", "Психолог-консультации"].map((item) => (
                <li key={item} className="text-xs text-foreground/50 flex items-center gap-2">
                  <span className="text-foreground/20">◦</span> {item}
                </li>
              ))}
            </ul>
          </div>
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
          <p className="text-sm">Агент прорабатывает продуктовый дизайн. Обновите страницу через пару минут.</p>
        </div>
      )}
    </ResearchLayout>
  );
}
