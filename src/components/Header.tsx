"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-[family-name:var(--font-playfair)] text-xl tracking-wide">
          <span className="text-gradient-gold">Свои</span>
          <span className="text-foreground/60 ml-1 text-sm font-[family-name:var(--font-inter)] uppercase tracking-[0.3em]">
            Club
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-foreground/60">
          <a href="#how" className="animated-underline hover:text-foreground transition-colors">
            Как это работает
          </a>
          <a href="#audience" className="animated-underline hover:text-foreground transition-colors">
            Для кого
          </a>
          <a href="#testimonials" className="animated-underline hover:text-foreground transition-colors">
            Отзывы
          </a>
          <a href="#faq" className="animated-underline hover:text-foreground transition-colors">
            FAQ
          </a>
          <a href="/research" className="animated-underline hover:text-foreground transition-colors">
            Исследования
          </a>
          <a
            href="#waitlist"
            className="ml-4 px-5 py-2 bg-gold/10 text-gold border border-gold/30 rounded-full text-sm hover:bg-gold/20 transition-colors"
          >
            Вступить
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground/60 hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-white/5 px-6 py-6 space-y-4">
          <a href="#how" onClick={() => setMenuOpen(false)} className="block text-foreground/70 hover:text-foreground">
            Как это работает
          </a>
          <a href="#audience" onClick={() => setMenuOpen(false)} className="block text-foreground/70 hover:text-foreground">
            Для кого
          </a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)} className="block text-foreground/70 hover:text-foreground">
            Отзывы
          </a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="block text-foreground/70 hover:text-foreground">
            FAQ
          </a>
          <a href="/research" onClick={() => setMenuOpen(false)} className="block text-foreground/70 hover:text-foreground">
            Исследования
          </a>
          <a
            href="#waitlist"
            onClick={() => setMenuOpen(false)}
            className="inline-block px-5 py-2 bg-gold/10 text-gold border border-gold/30 rounded-full text-sm"
          >
            Вступить
          </a>
        </div>
      )}
    </header>
  );
}
