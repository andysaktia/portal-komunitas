"use client";

import { ContentCard } from "@/components/site/ContentCard";
import { EmptyState } from "@/components/site/Page";
import type { Renungan } from "@/lib/types";
import { BookOpen, Search } from "lucide-react";
import { useMemo, useState } from "react";

export function RenunganExplorer({ renunganList }: { renunganList: Renungan[] }) {
  const [q, setQ] = useState("");
  const [penulis, setPenulis] = useState("Semua penulis");

  const penulisList = useMemo(
    () => ["Semua penulis", ...Array.from(new Set(renunganList.map((r) => r.author)))],
    [renunganList],
  );

  const hasil = renunganList.filter((r) => {
    const cocokPenulis = penulis === "Semua penulis" || r.author === penulis;
    const cocokCari =
      !q.trim() || (r.title + r.excerpt + r.verse).toLowerCase().includes(q.trim().toLowerCase());
    return cocokPenulis && cocokCari;
  });

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">Bacaan</p>
          <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">Renungan</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Bacaan singkat yang bisa diselesaikan dalam tiga menit. Setiap renungan punya tautannya sendiri,
            jadi tidak perlu lagi menyalin teks panjang ke grup.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari renungan atau ayat…"
                className="w-full rounded-full border border-input bg-background py-2.5 pr-4 pl-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {penulisList.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPenulis(p)}
                  className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                    penulis === p
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {hasil.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hasil.map((r) => (
              <ContentCard
                key={r.slug}
                href={`/renungan/${r.slug}`}
                cover={r.cover}
                badge={r.verse}
                title={r.title}
                date={r.date}
                excerpt={r.excerpt}
                meta={r.author}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookOpen className="size-6" />}
            title="Belum ada renungan di sini"
            description="Renungan baru terbit setiap Rabu. Coba hapus filter penulis atau kata kunci pencarian."
          />
        )}
      </section>
    </>
  );
}
