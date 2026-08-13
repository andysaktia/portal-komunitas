"use client";

import type { PokokDoaPeriode } from "@/lib/types";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function PokokDoaAktifCard({ doaAktif }: { doaAktif: PokokDoaPeriode }) {
  const [terbuka, setTerbuka] = useState(true);

  return (
    <div className="card-soft overflow-hidden">
      <button
        type="button"
        onClick={() => setTerbuka((v) => !v)}
        aria-expanded={terbuka}
        className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-5 text-left sm:px-7"
      >
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-secondary-foreground">
              POKOK DOA AKTIF
            </span>
            <span className="text-xs text-muted-foreground">{doaAktif.rentang}</span>
          </span>
          <span className="mt-2 block font-display text-xl font-semibold">{doaAktif.periode}</span>
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${terbuka ? "rotate-180" : ""}`}
        />
      </button>
      {terbuka && (
        <div className="border-t border-border px-5 py-5 sm:px-7">
          <ul className="space-y-3">
            {doaAktif.poin.map((p) => (
              <li key={p.topik} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{p.topik}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">{p.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/pokok-doa" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Lihat arsip pokok doa <ArrowRight className="size-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
