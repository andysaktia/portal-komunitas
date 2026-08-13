import { ArticleBody } from "@/components/site/ArticleBody";
import { ShareWhatsApp } from "@/components/site/ShareWhatsApp";
import { getRenunganBySlug, getRenunganList } from "@/lib/notion";
import { formatTanggal, ORG } from "@/lib/org";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const renunganList = await getRenunganList();
  return renunganList.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const renungan = await getRenunganBySlug(slug);
  if (!renungan) return { title: "Renungan tidak ditemukan", robots: { index: false } };

  const url = `/renungan/${slug}`;
  return {
    title: `${renungan.title} — Renungan ${ORG.short}`,
    description: renungan.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: renungan.title,
      description: renungan.excerpt,
      type: "article",
      url,
      images: renungan.cover ? [renungan.cover] : undefined,
    },
    twitter: { card: "summary_large_image", images: renungan.cover ? [renungan.cover] : undefined },
  };
}

export default async function RenunganDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const renungan = await getRenunganBySlug(slug);
  if (!renungan) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link href="/renungan" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="size-4" /> Semua renungan
      </Link>

      <span className="mt-6 inline-block rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold text-primary">
        {renungan.verse}
      </span>
      <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">{renungan.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {renungan.author} · {formatTanggal(renungan.date)}
      </p>

      <div className="relative mt-6 aspect-16/10 w-full overflow-hidden rounded-2xl shadow-soft">
        <Image src={renungan.cover} alt={renungan.title} fill sizes="768px" className="object-cover" priority />
      </div>

      <div className="mt-8">
        <ArticleBody blocks={renungan.body} />
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <p className="mb-3 text-sm font-semibold">Bagikan renungan ini</p>
        <ShareWhatsApp title={renungan.title} path={`/renungan/${renungan.slug}`} note="Renungan hari ini" />
      </div>
    </article>
  );
}
