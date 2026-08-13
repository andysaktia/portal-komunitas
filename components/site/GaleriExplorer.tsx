"use client";

import { EmptyState, PageHeader } from "@/components/site/Page";
import { formatTanggal } from "@/lib/org";
import type { GaleriEvent } from "@/lib/types";
import { ChevronLeft, ChevronRight, Images, MapPin, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export function GaleriExplorer({ galeriEvents }: { galeriEvents: GaleriEvent[] }) {
  const [aktif, setAktif] = useState<{ event: number; foto: number } | null>(null);

  const tutup = useCallback(() => setAktif(null), []);
  const geser = useCallback((arah: number) => {
    setAktif((prev) => {
      if (!prev) return prev;
      const total = galeriEvents[prev.event]?.photos.length ?? 1;
      return { ...prev, foto: (prev.foto + arah + total) % total };
    });
  }, [galeriEvents]);

  useEffect(() => {
    if (!aktif) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") tutup();
      if (e.key === "ArrowRight") geser(1);
      if (e.key === "ArrowLeft") geser(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [aktif, tutup, geser]);

  const event = aktif ? galeriEvents[aktif.event] : null;
  const foto = event && aktif ? event.photos[aktif.foto] : null;

  return (
    <>
      <PageHeader
        eyebrow="Dokumentasi"
        title="Galeri Kegiatan"
        description="Dikelompokkan per kegiatan. Ketuk cover untuk membuka foto-fotonya langsung di halaman ini."
      />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {galeriEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galeriEvents.map((ev, i) => (
              <button
                key={ev.slug}
                type="button"
                onClick={() => setAktif({ event: i, foto: 0 })}
                className="card-soft card-hover group overflow-hidden text-left"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={ev.cover}
                    alt={ev.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold">
                    {ev.photos.length} foto
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg leading-snug transition-colors group-hover:text-primary">{ev.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{formatTanggal(ev.date)}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0 text-primary" />
                    {ev.location}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Images className="size-6" />}
            title="Belum ada album foto"
            description="Foto kegiatan terbaru biasanya diunggah dalam 3 hari setelah acara selesai."
          />
        )}
      </section>

      {event && foto && (
        <div
          className="fixed inset-0 z-100 flex flex-col bg-overlay p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={event.title}
        >
          <div className="mx-auto grid w-full max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0 text-overlay-foreground">
              <p className="truncate font-display text-base font-semibold">{event.title}</p>
              <p className="text-xs opacity-70">
                Foto {aktif!.foto + 1} dari {event.photos.length}
              </p>
            </div>
            <button
              type="button"
              onClick={tutup}
              aria-label="Tutup galeri"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-overlay-foreground/15 text-overlay-foreground transition-colors hover:bg-overlay-foreground/25"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-5xl flex-1 items-center gap-2 py-4">
            <button
              type="button"
              onClick={() => geser(-1)}
              aria-label="Foto sebelumnya"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-overlay-foreground/15 text-overlay-foreground transition-colors hover:bg-overlay-foreground/25"
            >
              <ChevronLeft className="size-5" />
            </button>
            <figure className="relative min-h-[40vh] min-w-0 flex-1">
              <Image src={foto.src} alt={foto.caption} fill sizes="900px" className="rounded-xl object-contain" />
              <figcaption className="absolute -bottom-8 w-full text-center text-sm text-overlay-foreground/80">
                {foto.caption}
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={() => geser(1)}
              aria-label="Foto berikutnya"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-overlay-foreground/15 text-overlay-foreground transition-colors hover:bg-overlay-foreground/25"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <div className="mx-auto mt-6 flex w-full max-w-5xl gap-2 overflow-x-auto pb-1">
            {event.photos.map((p, i) => (
              <button
                key={p.caption + i}
                type="button"
                onClick={() => setAktif({ event: aktif!.event, foto: i })}
                aria-label={p.caption}
                className={`relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-opacity ${
                  i === aktif!.foto ? "border-secondary" : "border-transparent opacity-60"
                }`}
              >
                <Image src={p.src} alt={p.caption} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
