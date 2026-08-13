"use client";

import { useTheme } from "@/components/theme-provider";
import { ORG } from "@/lib/org";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/warta", label: "Warta" },
  { href: "/pokok-doa", label: "Pokok Doa" },
  { href: "/renungan", label: "Renungan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/laporan-keuangan", label: "Keuangan" },
  { href: "/tentang", label: "Tentang" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-lg font-semibold text-primary-foreground">
            P
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base leading-tight font-semibold">{ORG.short}</span>
            <span className="block truncate text-[11px] text-muted-foreground">Portal Komunitas</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground ${
                isActive(l.href)
                  ? "bg-primary-soft font-semibold text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
            className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka menu"
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          >
            {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted ${
                isActive(l.href) ? "font-semibold text-primary bg-primary-soft" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
