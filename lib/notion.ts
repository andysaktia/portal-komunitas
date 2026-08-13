import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { unstable_cache } from "next/cache";
import {
  mockGaleriEvents,
  mockLaporanList,
  mockPengurus,
  mockPokokDoaList,
  mockRenunganList,
  mockWartaList,
} from "./mock-data";
import type { GaleriEvent, Laporan, Pengurus, PokokDoaPeriode, Renungan, Warta } from "./types";

/**
 * Notion is the CMS for this Consumer-layer app (same pattern as `shemalens`
 * and the original Perkantas portal — see the architecture guide's note that
 * Notion sits outside the Data→Service→Consumer chain as an external CMS).
 *
 * Every getter below tries Notion first and falls back to the bundled mock
 * data in lib/mock-data.ts when the relevant env vars aren't set yet. This
 * means `npm run dev` works immediately, before a single Notion database
 * exists — same bootstrapping trick used for shemalens.
 */

const notion = process.env.NOTION_TOKEN ? new Client({ auth: process.env.NOTION_TOKEN }) : null;

const DB = {
  warta: process.env.NOTION_DB_WARTA,
  renungan: process.env.NOTION_DB_RENUNGAN,
  pokokDoaPeriode: process.env.NOTION_DB_POKOK_DOA_PERIODE,
  pokokDoaPoin: process.env.NOTION_DB_POKOK_DOA_POIN,
  galeriEvent: process.env.NOTION_DB_GALERI_EVENT,
  galeriPhoto: process.env.NOTION_DB_GALERI_PHOTO,
  laporan: process.env.NOTION_DB_LAPORAN,
  pengurus: process.env.NOTION_DB_PENGURUS,
};

const REVALIDATE_SECONDS = 60 * 30; // 30 min — content here changes more often than a blog

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function title(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  if (p?.type !== "title") return "";
  return p.title.map((t) => t.plain_text).join("");
}

function richText(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  if (p?.type !== "rich_text") return "";
  return p.rich_text.map((t) => t.plain_text).join("");
}

function selectValue(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  if (p?.type !== "select") return "";
  return p.select?.name ?? "";
}

function dateValue(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  if (p?.type !== "date") return "";
  return p.date?.start ?? "";
}

function checkboxValue(page: PageObjectResponse, prop: string): boolean {
  const p = page.properties[prop];
  return p?.type === "checkbox" ? p.checkbox : false;
}

function numberValue(page: PageObjectResponse, prop: string): number {
  const p = page.properties[prop];
  return p?.type === "number" ? (p.number ?? 0) : 0;
}

function relationIds(page: PageObjectResponse, prop: string): string[] {
  const p = page.properties[prop];
  return p?.type === "relation" ? p.relation.map((r) => r.id) : [];
}

function fileUrl(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  if (p?.type !== "files" || p.files.length === 0) return "";
  const f = p.files[0];
  if (f.type === "external") return f.external.url;
  if (f.type === "file") return f.file.url;
  return "";
}

function slugFrom(page: PageObjectResponse, prop: string): string {
  const explicit = richText(page, prop);
  if (explicit) return explicit;
  // Fall back to a slugified title if no explicit Slug column is filled in.
  return title(page, "Title")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Converts Notion page-content blocks into the simple string[] format the
 * existing <ArticleBody> renderer expects ("## heading", "> quote", plain
 * paragraph) — keeps the UI component unchanged from the Lovable prototype. */
async function pageBodyBlocks(pageId: string): Promise<string[]> {
  if (!notion) return [];
  const blocks: string[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.blocks.children.list({ block_id: pageId, start_cursor: cursor });
    for (const block of res.results as BlockObjectResponse[]) {
      const text = (rt: { plain_text: string }[]) => rt.map((t) => t.plain_text).join("");
      if (block.type === "paragraph") {
        const t = text(block.paragraph.rich_text);
        if (t) blocks.push(t);
      } else if (block.type === "heading_2" || block.type === "heading_3") {
        const rt = block.type === "heading_2" ? block.heading_2.rich_text : block.heading_3.rich_text;
        blocks.push(`## ${text(rt)}`);
      } else if (block.type === "quote") {
        blocks.push(`> ${text(block.quote.rich_text)}`);
      } else if (block.type === "bulleted_list_item") {
        blocks.push(`- ${text(block.bulleted_list_item.rich_text)}`);
      }
    }
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return blocks;
}

async function queryDatabase(databaseId: string, sorts?: Parameters<Client["databases"]["query"]>[0]["sorts"]) {
  if (!notion) return [];
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      sorts,
    });
    pages.push(...(res.results as PageObjectResponse[]));
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return pages;
}

// ---------------------------------------------------------------------------
// Warta
// ---------------------------------------------------------------------------

async function fetchWartaList(): Promise<Warta[]> {
  if (!notion || !DB.warta) return mockWartaList;
  const pages = await queryDatabase(DB.warta, [{ property: "Date", direction: "descending" }]);
  return Promise.all(
    pages.map(async (page) => ({
      slug: slugFrom(page, "Slug"),
      title: title(page, "Title"),
      date: dateValue(page, "Date"),
      excerpt: richText(page, "Excerpt"),
      cover: fileUrl(page, "Cover"),
      category: selectValue(page, "Category"),
      body: await pageBodyBlocks(page.id),
    })),
  );
}

export const getWartaList = unstable_cache(fetchWartaList, ["warta-list"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["warta"],
});

export async function getWartaBySlug(slug: string): Promise<Warta | null> {
  const list = await getWartaList();
  return list.find((w) => w.slug === slug) ?? null;
}

// ---------------------------------------------------------------------------
// Renungan
// ---------------------------------------------------------------------------

async function fetchRenunganList(): Promise<Renungan[]> {
  if (!notion || !DB.renungan) return mockRenunganList;
  const pages = await queryDatabase(DB.renungan, [{ property: "Date", direction: "descending" }]);
  return Promise.all(
    pages.map(async (page) => ({
      slug: slugFrom(page, "Slug"),
      title: title(page, "Title"),
      date: dateValue(page, "Date"),
      author: richText(page, "Author"),
      verse: richText(page, "Verse"),
      excerpt: richText(page, "Excerpt"),
      cover: fileUrl(page, "Cover"),
      body: await pageBodyBlocks(page.id),
    })),
  );
}

export const getRenunganList = unstable_cache(fetchRenunganList, ["renungan-list"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["renungan"],
});

export async function getRenunganBySlug(slug: string): Promise<Renungan | null> {
  const list = await getRenunganList();
  return list.find((r) => r.slug === slug) ?? null;
}

// ---------------------------------------------------------------------------
// Pokok Doa (two related databases: Periode -> Poin)
// ---------------------------------------------------------------------------

async function fetchPokokDoaList(): Promise<PokokDoaPeriode[]> {
  if (!notion || !DB.pokokDoaPeriode || !DB.pokokDoaPoin) return mockPokokDoaList;

  const [periodePages, poinPages] = await Promise.all([
    queryDatabase(DB.pokokDoaPeriode, [{ property: "Month", direction: "descending" }]),
    queryDatabase(DB.pokokDoaPoin),
  ]);

  return periodePages.map((page) => {
    const relatedPoinIds = new Set(relationIds(page, "Poin"));
    const poin = poinPages
      .filter((p) => relatedPoinIds.has(p.id))
      .map((p) => ({ topik: title(p, "Topik"), detail: richText(p, "Detail") }));

    return {
      id: page.id,
      periode: title(page, "Periode"),
      month: dateValue(page, "Month").slice(0, 7),
      rentang: richText(page, "Rentang"),
      aktif: checkboxValue(page, "Aktif"),
      poin,
    };
  });
}

export const getPokokDoaList = unstable_cache(fetchPokokDoaList, ["pokok-doa-list"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["pokok-doa"],
});

// ---------------------------------------------------------------------------
// Galeri (two related databases: Event -> Photo)
// ---------------------------------------------------------------------------

async function fetchGaleriEvents(): Promise<GaleriEvent[]> {
  if (!notion || !DB.galeriEvent || !DB.galeriPhoto) return mockGaleriEvents;

  const [eventPages, photoPages] = await Promise.all([
    queryDatabase(DB.galeriEvent, [{ property: "Date", direction: "descending" }]),
    queryDatabase(DB.galeriPhoto),
  ]);

  return eventPages.map((page) => {
    const relatedPhotoIds = new Set(relationIds(page, "Photos"));
    const photos = photoPages
      .filter((p) => relatedPhotoIds.has(p.id))
      .map((p) => ({ src: fileUrl(p, "Image"), caption: richText(p, "Caption") }));

    return {
      slug: slugFrom(page, "Slug"),
      title: title(page, "Title"),
      date: dateValue(page, "Date"),
      location: richText(page, "Location"),
      cover: fileUrl(page, "Cover"),
      photos,
    };
  });
}

export const getGaleriEvents = unstable_cache(fetchGaleriEvents, ["galeri-events"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["galeri"],
});

// ---------------------------------------------------------------------------
// Laporan Keuangan
// ---------------------------------------------------------------------------

async function fetchLaporanList(): Promise<Laporan[]> {
  if (!notion || !DB.laporan) return mockLaporanList;
  const pages = await queryDatabase(DB.laporan, [{ property: "Periode", direction: "descending" }]);
  return pages.map((page) => ({
    id: page.id,
    periode: title(page, "Periode"),
    masuk: numberValue(page, "Masuk"),
    keluar: numberValue(page, "Keluar"),
    saldo: numberValue(page, "Saldo"),
    catatan: richText(page, "Catatan"),
  }));
}

export const getLaporanList = unstable_cache(fetchLaporanList, ["laporan-list"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["laporan"],
});

// ---------------------------------------------------------------------------
// Pengurus
// ---------------------------------------------------------------------------

async function fetchPengurus(): Promise<Pengurus[]> {
  if (!notion || !DB.pengurus) return mockPengurus;
  const pages = await queryDatabase(DB.pengurus);
  return pages.map((page) => ({
    name: title(page, "Name"),
    role: richText(page, "Role"),
    photo: fileUrl(page, "Photo"),
  }));
}

export const getPengurus = unstable_cache(fetchPengurus, ["pengurus-list"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["pengurus"],
});
