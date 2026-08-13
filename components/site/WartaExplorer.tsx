"use client";

import { ContentCard } from "@/components/site/ContentCard";
import { EmptyState } from "@/components/site/Page";
import type { Warta } from "@/lib/types";
import { Newspaper, Search } from "lucide-react";
import { useMemo, useState } from "react";

/** Self-contained header + filter bar + results grid (bundled in one client
 * component because search/category state needs to drive both the filter
 * controls and the results grid). */
export function WartaExplorer({ wartaList }: { wartaList: Warta[] }) {
  const [q, setQ] = useState("");
  const [kategori, setKategori] = useState("Semua");

  const kategoriList = useMemo(
    () => ["Semua", ...Array.from(new Set(wartaList.map((w) => w.category)))],
    [wartaList],
  );

  const hasil = wartaList.filter((w) => {
    const cocokKategori = kategori === "Semua" || w.category === kategori;
    const cocokCari = !q.trim() || (w.title + w.excerpt).toLowerCase().includes(q.trim().toLowerCase());
    return cocokKategori && cocokCari;
  });

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">Informasi</p>
          <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">Warta & Kabar</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Semua warta yang biasanya dikirim sebagai PDF di grup WhatsApp, sekarang punya halaman sendiri —
            bisa dibuka langsung dari HP dan dibagikan ulang kapan saja.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari warta lama…"
                className="w-full rounded-full border border-input bg-background py-2.5 pr-4 pl-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {kategoriList.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKategori(k)}
                  className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                    kategori === k
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {hasil.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hasil.map((w) => (
              <ContentCard
                key={w.slug}
                href={`/warta/${w.slug}`}
                cover={w.cover}
                badge={w.category}
                title={w.title}
                date={w.date}
                excerpt={w.excerpt}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Newspaper className="size-6" />}
            title="Belum ada warta yang cocok"
            description='Coba kata kunci lain atau pilih kategori "Semua". Warta baru biasanya terbit setiap awal bulan.'
          />
        )}
      </section>
    </>
  );
}
