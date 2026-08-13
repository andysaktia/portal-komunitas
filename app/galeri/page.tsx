import { GaleriExplorer } from "@/components/site/GaleriExplorer";
import { getGaleriEvents } from "@/lib/notion";
import { ORG } from "@/lib/org";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Galeri Kegiatan — ${ORG.short}`,
  description:
    "Foto kegiatan komunitas dikelompokkan per acara dan bisa dilihat langsung di browser — tanpa link Google Drive dan tanpa perlu mengunduh.",
  alternates: { canonical: "/galeri" },
  openGraph: {
    title: `Galeri Kegiatan — ${ORG.short}`,
    description: "Lihat foto retret, orientasi, dan pelatihan langsung dari HP tanpa mengunduh.",
    type: "website",
  },
};

export default async function GaleriPage() {
  const galeriEvents = await getGaleriEvents();
  return <GaleriExplorer galeriEvents={galeriEvents} />;
}
