import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const ALLOWED_FILES = [
  "COMPETITORS.md",
  "AUDIENCE.md",
  "MARKETING-STRATEGY.md",
  "PRODUCT-DESIGN.md",
  "GROWTH-PLAYBOOK.md",
  "GEO-STRATEGY.md",
];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  if (!ALLOWED_FILES.includes(filename)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "docs", filename);
    const content = await readFile(filePath, "utf-8");
    return new NextResponse(content, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
