"use client";

import { EmptyState } from "@/components/site/Page";
import type { PokokDoaPeriode } from "@/lib/types";
import { ChevronDown, HandHeart, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";

const namaBulan = (ym: string) =>
  new Date(ym + "-01T00:00:00").toLocaleDateString("id-ID", { month: "long", year: "numeric" });

export function PokokDoaExplorer({ pokokDoaList }: { pokokDoaList: PokokDoaPeriode[] }) {
  const [bulan, setBulan] = useState("Semua");
  const [terbuka, setTerbuka] = useState<string[]>([pokokDoaList[0]?.id ?? ""]);

  const bulanList = useMemo(
    () => ["Semua", ...Array.from(new Set(pokokDoaList.map((p) => p.month)))],
    [pokokDoaList],
  );

  const hasil = pokokDoaList.filter((p) => bulan === "Semua" || p.month === bulan);

  const toggle = (id: string) =>
    setTerbuka((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const shareAktif = () => {
    const aktif = pokokDoaList.find((p) => p.aktif);
    if (!aktif) return;
    const text = `*Pokok Doa ${aktif.periode}*\n${aktif.rentang}\n\n${aktif.poin
      .map((p, i) => `${i + 1}. ${p.topik} — ${p.detail}`)
      .join("\n")}\n\n${typeof window !== "undefined" ? window.location.origin : ""}/pokok-doa`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">Berdoa bersama</p>
          <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">Pokok Doa</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Ditulis sebagai poin-poin singkat, bukan paragraf panjang — supaya bisa dibaca cepat sebelum
            berdoa, sendiri maupun di kelompok kecil.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {bulanList.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBulan(b)}
                className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                  bulan === b
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {b === "Semua" ? "Semua bulan" : namaBulan(b)}
              </button>
            ))}
            <button
              type="button"
              onClick={shareAktif}
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-4" /> Bagikan pokok doa aktif
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        {hasil.length > 0 ? (
          <div className="space-y-4">
            {hasil.map((p) => {
              const open = terbuka.includes(p.id);
              return (
                <div key={p.id} className="card-soft overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggle(p.id)}
                    aria-expanded={open}
                    className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 text-left"
                  >
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-base font-semibold">{p.periode}</span>
                        {p.aktif && (
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-secondary-foreground">
                            AKTIF
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {p.rentang} · {p.poin.length} pokok doa
                      </span>
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    />
                  </button>

                  {open && (
                    <ul className="space-y-3 border-t border-border px-5 py-4">
                      {p.poin.map((poin) => (
                        <li key={poin.topik} className="flex gap-3">
                          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold">{poin.topik}</span>
                            <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                              {poin.detail}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<HandHeart className="size-6" />}
            title="Belum ada pokok doa untuk bulan ini"
            description="Pokok doa disusun setiap awal pekan oleh koordinator doa. Pilih bulan lain untuk melihat arsipnya."
          />
        )}
      </section>
    </>
  );
}
