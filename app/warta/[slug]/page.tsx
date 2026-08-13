import { ArticleBody } from "@/components/site/ArticleBody";
import { ShareWhatsApp } from "@/components/site/ShareWhatsApp";
import { getWartaBySlug, getWartaList } from "@/lib/notion";
import { formatTanggal, ORG } from "@/lib/org";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const wartaList = await getWartaList();
  return wartaList.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const warta = await getWartaBySlug(slug);
  if (!warta) return { title: "Warta tidak ditemukan", robots: { index: false } };

  const url = `/warta/${slug}`;
  return {
    title: `${warta.title} — ${ORG.short}`,
    description: warta.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: warta.title,
      description: warta.excerpt,
      type: "article",
      url,
      images: warta.cover ? [warta.cover] : undefined,
    },
    twitter: { card: "summary_large_image", images: warta.cover ? [warta.cover] : undefined },
  };
}

export default async function WartaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const warta = await getWartaBySlug(slug);
  if (!warta) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link href="/warta" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="size-4" /> Semua warta
      </Link>

      <span className="mt-6 inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-secondary-foreground">
        {warta.category}
      </span>
      <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">{warta.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{formatTanggal(warta.date)}</p>

      <div className="relative mt-6 aspect-16/10 w-full overflow-hidden rounded-2xl shadow-soft">
        <Image src={warta.cover} alt={warta.title} fill sizes="768px" className="object-cover" priority />
      </div>

      <div className="mt-8">
        <ArticleBody blocks={warta.body} />
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <p className="mb-3 text-sm font-semibold">Bagikan warta ini</p>
        <ShareWhatsApp title={warta.title} path={`/warta/${warta.slug}`} note={`Warta ${ORG.short}`} />
      </div>
    </article>
  );
}
