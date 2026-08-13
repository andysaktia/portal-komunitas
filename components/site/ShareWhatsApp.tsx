"use client";

import { Check, Copy, MessageCircle } from "lucide-react";
import { useState } from "react";

export function ShareWhatsApp({ title, path, note }: { title: string; path: string; note?: string }) {
  const [copied, setCopied] = useState(false);

  const buildUrl = () => (typeof window === "undefined" ? path : `${window.location.origin}${path}`);

  const openWa = () => {
    const text = `${note ? note + "\n\n" : ""}*${title}*\n${buildUrl()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={openWa}
        className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <MessageCircle className="size-4" />
        Bagikan ke WhatsApp
      </button>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
        {copied ? "Tautan disalin" : "Salin tautan"}
      </button>
    </div>
  );
}
