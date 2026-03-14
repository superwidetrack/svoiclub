export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="font-[family-name:var(--font-playfair)] text-lg">
            <span className="text-gradient-gold">Свои</span>
            <span className="text-foreground/40 ml-1 text-xs font-[family-name:var(--font-inter)] uppercase tracking-[0.3em]">
              Club
            </span>
          </a>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-foreground/30">
            <a href="#how" className="hover:text-foreground/60 transition-colors">
              Как это работает
            </a>
            <a href="#faq" className="hover:text-foreground/60 transition-colors">
              FAQ
            </a>
            <a href="#waitlist" className="hover:text-foreground/60 transition-colors">
              Заявка
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-foreground/20">
            &copy; {new Date().getFullYear()} Свои Club
          </div>
        </div>
      </div>
    </footer>
  );
}
