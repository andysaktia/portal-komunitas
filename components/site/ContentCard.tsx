import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatTanggal } from "@/lib/org";

export function ContentCard({
  href,
  cover,
  badge,
  title,
  date,
  excerpt,
  meta,
}: {
  href: string;
  cover: string;
  badge: string;
  title: string;
  date: string;
  excerpt: string;
  meta?: string;
}) {
  return (
    <Link href={href} className="card-soft card-hover group flex flex-col overflow-hidden">
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={cover}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-secondary-foreground">
          {badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-muted-foreground">
          {formatTanggal(date)}
          {meta ? ` · ${meta}` : ""}
        </p>
        <h3 className="mt-2 text-lg leading-snug transition-colors group-hover:text-primary">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Baca selengkapnya
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
