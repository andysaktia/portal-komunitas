import { ORG } from "@/lib/org";
import { Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <h3 className="font-display text-lg">{ORG.name}</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{ORG.tagline}</p>
          <div className="mt-4 flex gap-2">
            <a
              href={ORG.waGroup}
              className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Grup WhatsApp"
            >
              <MessageCircle className="size-[18px]" />
            </a>
            <a
              href={ORG.instagram}
              className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Instagram"
            >
              <Instagram className="size-[18px]" />
            </a>
            <a
              href={ORG.youtube}
              className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="YouTube"
            >
              <Youtube className="size-[18px]" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide uppercase">Jelajahi</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/warta" className="transition-colors hover:text-primary">Warta & Kabar</Link></li>
            <li><Link href="/pokok-doa" className="transition-colors hover:text-primary">Pokok Doa</Link></li>
            <li><Link href="/renungan" className="transition-colors hover:text-primary">Renungan</Link></li>
            <li><Link href="/galeri" className="transition-colors hover:text-primary">Galeri</Link></li>
            <li><Link href="/laporan-keuangan" className="transition-colors hover:text-primary">Laporan Keuangan</Link></li>
            <li><Link href="/tentang" className="transition-colors hover:text-primary">Tentang Kami</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide uppercase">Kontak</h4>
          <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" />{ORG.address}</li>
            <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0 text-primary" />{ORG.email}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-primary" />{ORG.phone}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {ORG.name}.
      </div>
    </footer>
  );
}
