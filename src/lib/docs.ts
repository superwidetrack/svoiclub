export type DocStatus = "ready" | "pending";

export const DOC_FILES = [
  "COMPETITORS.md",
  "AUDIENCE.md",
  "MARKETING-STRATEGY.md",
  "PRODUCT-DESIGN.md",
  "GROWTH-PLAYBOOK.md",
  "GEO-STRATEGY.md",
] as const;

export function getDocUrl(filename: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/svoiclub";
  return `${basePath}/docs/${filename}`;
}
