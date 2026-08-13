"use client";

import { PageHeader } from "@/components/site/Page";
import { formatRupiah } from "@/lib/org";
import type { Laporan } from "@/lib/types";
import { Download, FileText, KeyRound, Lock } from "lucide-react";
import { useState } from "react";

// Mockup: gerbang akses sederhana di sisi klien (bukan autentikasi sungguhan).
// TODO: ganti dengan auth sungguhan (mis. NextAuth) sebelum data asli dipakai.
const KODE_AKSES = "komunitas2026";

export function LaporanExplorer({ laporanList }: { laporanList: Laporan[] }) {
  const [terbuka, setTerbuka] = useState(false);
  const [kode, setKode] = useState("");
  const [salah, setSalah] = useState(false);

  if (!terbuka) {
    return (
      <section className="mx-auto flex min-h-[75vh] max-w-md items-center px-4 py-12">
        <div className="card-soft w-full px-6 py-10 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Lock className="size-6" />
          </div>
          <h1 className="mt-5 text-2xl">Halaman khusus pengurus & donatur</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Laporan keuangan kami terbuka, tapi tidak dipublikasikan bebas. Silakan masukkan kode akses yang
            dibagikan sekretariat di grup pengurus.
          </p>

          <form
            className="mt-6 space-y-3 text-left"
            onSubmit={(e) => {
              e.preventDefault();
              if (kode.trim().toLowerCase() === KODE_AKSES) {
                setTerbuka(true);
                setSalah(false);
              } else {
                setSalah(true);
              }
            }}
          >
            <label htmlFor="kode" className="block text-sm font-medium">
              Kode akses
            </label>
            <div className="relative">
              <KeyRound className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="kode"
                type="password"
                value={kode}
                onChange={(e) => {
                  setKode(e.target.value);
                  setSalah(false);
                }}
                placeholder="Masukkan kode"
                autoComplete="current-password"
                className="w-full rounded-xl border border-input bg-background py-3 pr-4 pl-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            {salah && (
              <p className="text-sm text-destructive">
                Kode belum sesuai. Coba lagi atau hubungi sekretariat lewat WhatsApp.
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Buka laporan
            </button>
          </form>

          <p className="mt-5 text-xs text-muted-foreground">
            Demo mockup — gunakan kode <span className="font-semibold">komunitas2026</span>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Transparansi"
        title="Laporan Keuangan"
        description="Ringkasan pemasukan, pengeluaran, dan saldo kas per periode. Berkas lengkap tersedia dalam format PDF."
      />
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <div className="space-y-4">
          {laporanList.map((l) => (
            <div key={l.id} className="card-soft p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
                <div className="min-w-0">
                  <h3 className="truncate text-lg">{l.periode}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{l.catatan}</p>
                </div>
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Download className="size-4" /> PDF
                </button>
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Pemasukan</dt>
                  <dd className="mt-0.5 font-semibold text-primary">{formatRupiah(l.masuk)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Pengeluaran</dt>
                  <dd className="mt-0.5 font-semibold">{formatRupiah(l.keluar)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Saldo kas</dt>
                  <dd className="mt-0.5 font-semibold">{formatRupiah(l.saldo)}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-8 flex items-start gap-2 text-xs text-muted-foreground">
          <FileText className="mt-0.5 size-4 shrink-0 text-primary" />
          Angka pada mockup ini adalah data contoh. Pertanyaan mengenai laporan dapat diajukan ke sekretariat.
        </p>
      </section>
    </>
  );
}
