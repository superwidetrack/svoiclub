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
  { dimension: "Жизн. цели", weight: 20 },
  { dimension: "Big Five", weight: 15 },
  { dimension: "Эмиграция", weight: 10 },
  { dimension: "Языки любви", weight: 5 },
  { dimension: "Интервью", weight: 5 },
];

const compatibilityProfile = [
  { trait: "Открытость", user1: 82, user2: 78 },
  { trait: "Добросовестность", user1: 65, user2: 72 },
  { trait: "Экстраверсия", user1: 45, user2: 60 },
  { trait: "Доброжелательность", user1: 78, user2: 85 },
  { trait: "Эмоц. стабильность", user1: 68, user2: 74 },
  { trait: "Ценности", user1: 88, user2: 90 },
];

const questionnaireCategories = [
  {
    category: "Big Five (OCEAN)",
    questions: 24,
    examples: ["Мне важна интеллектуальная стимуляция в паре", "Я планирую жизнь на годы вперёд", "Я заряжаюсь энергией от общения с людьми"],
  },
  {
    category: "Стиль привязанности",
    questions: 14,
    examples: ["Когда партнёр не отвечает, я начинаю тревожиться", "Мне сложно полностью довериться другому", "В конфликте мне важно быстро помириться"],
  },
  {
    category: "Ценности (Schwartz)",
    questions: 16,
    examples: ["Свобода выбора важнее стабильности", "Семейные традиции важны для меня", "Карьерный успех — мой приоритет"],
  },
  {
    category: "Отношения и dealbreakers",
    questions: 10,
    examples: ["Что вы ищете прямо сейчас?", "Насколько важна физическая привлекательность?", "Готовы ли вы к отношениям на расстоянии?"],
  },
  {
    category: "Эмиграционный профиль",
    questions: 8,
    examples: ["Как вы идентифицируете себя за рубежом?", "Планируете ли вы вернуться?", "На каком языке ведёте внутренний диалог?"],
  },
];

const uxFlowSteps = [
  { step: 1, name: "Заявка на сайте", desc: "Email + страна + возраст", duration: "2 мин", icon: "📝" },
  { step: 2, name: "Подробная анкета", desc: "68 вопросов в 5 блоках", duration: "38 мин", icon: "📋" },
  { step: 3, name: "Психопрофиль", desc: "Big Five + Attachment + Schwartz", duration: "входит в анкету", icon: "🧠" },
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
        <StatCard label="Вопросов" value="68" icon="◇" />
        <StatCard label="Параметров матча" value="7" />
        <StatCard label="Время онбординга" value="~58 мин" />
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
