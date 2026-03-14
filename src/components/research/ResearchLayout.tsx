"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/research", label: "Dashboard", icon: "◆" },
  { href: "/research/competitors", label: "Конкуренты", icon: "◈" },
  { href: "/research/audience", label: "Аудитория", icon: "◉" },
  { href: "/research/marketing", label: "Маркетинг", icon: "◎" },
  { href: "/research/product", label: "Продукт", icon: "◇" },
  { href: "/research/growth", label: "Playbook", icon: "▶" },
  { href: "/research/geo-strategy", label: "География", icon: "◐" },
];

export default function ResearchLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-[family-name:var(--font-playfair)] text-lg"
            >
              <span className="text-gradient-gold">Свои</span>
              <span className="text-foreground/40 ml-1 text-xs font-[family-name:var(--font-inter)] uppercase tracking-[0.3em]">
                Research
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === item.href
                      ? "bg-gold/10 text-gold"
                      : "text-foreground/40 hover:text-foreground/70 hover:bg-white/5"
                  }`}
                >
                  <span className="mr-1.5 text-[10px]">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/"
            className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
          >
            &larr; На сайт
          </Link>
        </div>
      </header>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-t border-white/5 px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] transition-colors ${
              pathname === item.href
                ? "text-gold"
                : "text-foreground/40"
            }`}
          >
            <span className="text-sm">{item.icon}</span>
            <span>{item.label.slice(0, 6)}</span>
          </Link>
        ))}
      </div>

      {/* Content */}
      <main className="pt-14 pb-20 md:pb-0">
        {/* Page header */}
        <div className="border-b border-white/5 bg-surface/50">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-foreground/40 mt-2 max-w-2xl">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
