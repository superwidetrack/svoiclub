"use client";

import { ReactNode } from "react";

export default function ChartCard({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-6 rounded-xl bg-surface border border-white/5 ${className}`}
    >
      <div className="mb-4">
        <h3 className="font-medium text-foreground/80">{title}</h3>
        {subtitle && (
          <p className="text-xs text-foreground/40 mt-0.5">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
