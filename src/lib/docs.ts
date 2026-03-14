import { readFile } from "fs/promises";
import path from "path";

export async function getDocContent(filename: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "docs", filename);
    const content = await readFile(filePath, "utf-8");
    return content;
  } catch {
    return null;
  }
}

export type DocStatus = "ready" | "pending";

export async function getDocsStatus(): Promise<
  Record<string, DocStatus>
> {
  const files = [
    "COMPETITORS.md",
    "AUDIENCE.md",
    "MARKETING-STRATEGY.md",
    "PRODUCT-DESIGN.md",
  ];

  const statuses: Record<string, DocStatus> = {};
  for (const file of files) {
    const content = await getDocContent(file);
    statuses[file] = content ? "ready" : "pending";
  }
  return statuses;
}
