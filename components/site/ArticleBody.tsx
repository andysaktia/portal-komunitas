import type { ReactNode } from "react";

/** Renders the simple markdown-ish body used for Warta/Renungan content.
 * Blocks come either from lib/mock-data.ts or are converted from Notion page
 * blocks in lib/notion.ts (pageBodyBlocks) — same shape either way. */
export function ArticleBody({ blocks }: { blocks: string[] }) {
  const nodes: ReactNode[] = [];
  blocks.forEach((block, i) => {
    block.split("\n").forEach((line, j) => {
      const key = `${i}-${j}`;
      if (!line.trim()) return;
      if (line.startsWith("## ")) nodes.push(<h2 key={key}>{line.slice(3)}</h2>);
      else if (line.startsWith("> ")) nodes.push(<blockquote key={key}>{line.slice(2)}</blockquote>);
      else if (line.startsWith("- ")) nodes.push(<li key={key}>{line.slice(2)}</li>);
      else nodes.push(<p key={key}>{line}</p>);
    });
  });
  return <div className="prose-reading text-[17px] text-foreground">{nodes}</div>;
}
