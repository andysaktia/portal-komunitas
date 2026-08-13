import { ContentCard } from "@/components/site/ContentCard";
import { PokokDoaAktifCard } from "@/components/site/PokokDoaAktifCard";
import { getGaleriEvents, getPokokDoaList, getRenunganList, getWartaList } from "@/lib/notion";
import { formatTanggal, ORG } from "@/lib/org";
import { ArrowRight, HandHeart, Images, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Beranda() {
  const [wartaList, renunganList, pokokDoaList, galeriEvents] = await Promise.all([
    getWartaList(),
    getRenunganList(),
    getPokokDoaList(),
    getGaleriEvents(),
  ]);

  const doaAktif = pokokDoaList.find((p) => p.aktif) ?? pokokDoaList[0];

  const terbaru = [
    ...wartaList.slice(0, 2).map((w) => ({
      key: w.slug,
      href: `/warta/${w.slug}`,
      cover: w.cover,
      badge: w.category,
      title: w.title,
      date: w.date,
      excerpt: w.excerpt,
      meta: undefined as string | undefined,
    })),
    ...renunganList.slice(0, 1).map((r) => ({
      key: r.slug,
      href: `/renungan/${r.slug}`,
      cover: r.cover,
      badge: "Renungan",
      title: r.title,
      date: r.date,
      excerpt: r.excerpt,
      meta: r.author as string | undefined,
    })),
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:py-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-secondary-soft px-3 py-1.5 text-[11px] font-semibold tracking-wide text-secondary-foreground uppercase">
              {ORG.city}
            </p>
            <h1 className="mt-4 text-[2rem] leading-tight sm:text-5xl">
              Semua kabar komunitas, <span className="text-primary">di satu tautan</span>
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {ORG.tagline} Tidak perlu lagi mengunduh PDF atau membuka link Drive — cukup buka halamannya
              dan bagikan ulang ke grup.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/warta"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Lihat warta terbaru <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/pokok-doa"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                <HandHeart className="size-4 text-primary" /> Pokok doa pekan ini
              </Link>
            </div>
          </div>
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-lift">
            <Image
              src="https://picsum.photos/seed/komunitas/1600/1000"
              alt="Mahasiswa dan alumni berdiskusi dalam kelompok kecil"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Konten terbaru */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl">Terbaru dari Warta & Renungan</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tiga bacaan terakhir yang dibagikan komunitas.</p>
          </div>
          <Link href="/warta" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary sm:inline-flex">
            Semua warta <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {terbaru.map((t) => (
            <ContentCard
              key={t.key}
              href={t.href}
              cover={t.cover}
              badge={t.badge}
              title={t.title}
              date={t.date}
              excerpt={t.excerpt}
              meta={t.meta}
            />
          ))}
        </div>
      </section>

      {/* Pokok doa aktif */}
      {doaAktif && (
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:pb-16">
          <PokokDoaAktifCard doaAktif={doaAktif} />
        </section>
      )}

      {/* Galeri CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:pb-16">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl">Galeri kegiatan terbaru</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Foto-foto dilihat langsung di browser, tanpa unduh dan tanpa Google Drive.
            </p>
          </div>
          <Link href="/galeri" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary sm:inline-flex">
            Buka galeri <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {galeriEvents.slice(0, 4).map((ev) => (
            <Link key={ev.slug} href="/galeri" className="card-soft card-hover group overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={ev.cover}
                  alt={ev.title}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3.5">
                <p className="line-clamp-2 text-sm font-semibold leading-snug">{ev.title}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Images className="size-3.5 shrink-0" />
                  {ev.photos.length} foto · {formatTanggal(ev.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tentang ringkas */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="card-soft grid gap-6 p-6 sm:p-9 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">Tentang kami</p>
            <h2 className="mt-3 text-2xl sm:text-3xl">Komunitas kecil, perjalanan panjang</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              Berawal dari tujuh mahasiswa di sebuah rumah kos pada 2009, kini kami mendampingi kelompok kecil
              di lima kampus dan sebuah persekutuan alumni yang aktif di {ORG.city}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Kenali kami lebih lanjut <ArrowRight className="size-4" />
              </Link>
              <a
                href={ORG.waGroup}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                <MessageCircle className="size-4 text-primary" /> Gabung grup WA
              </a>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-4 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            {[
              { k: "5", v: "kampus mitra" },
              { k: "24", v: "kelompok kecil" },
              { k: "310", v: "alumni terhubung" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-3xl font-semibold text-primary">{s.k}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
