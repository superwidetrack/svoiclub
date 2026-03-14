"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-foreground tracking-tight mt-12 mb-6 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-white/5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-[family-name:var(--font-playfair)] text-xl text-foreground/90 mt-8 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-medium text-foreground/80 mt-6 mb-2 uppercase tracking-wider text-sm">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-foreground/50 leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="space-y-2 mb-6 ml-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-2 mb-6 ml-1 list-decimal list-inside">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-foreground/50 leading-relaxed flex items-start gap-2">
              <span className="text-gold/50 mt-1.5 text-[8px]">●</span>
              <span>{children}</span>
            </li>
          ),
          strong: ({ children }) => (
            <strong className="text-foreground/80 font-semibold">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-gold/70 not-italic">{children}</em>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-gold/30 pl-4 my-6 text-foreground/40 italic">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold underline underline-offset-2 transition-colors"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-white/5">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-surface-light border-b border-white/5">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-foreground/50 border-t border-white/[0.03]">
              {children}
            </td>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className="block bg-surface-light rounded-lg p-4 my-4 text-sm text-foreground/60 overflow-x-auto border border-white/5">
                  {children}
                </code>
              );
            }
            return (
              <code className="bg-gold/10 text-gold/80 px-1.5 py-0.5 rounded text-sm">
                {children}
              </code>
            );
          },
          hr: () => (
            <hr className="my-8 border-white/5" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
