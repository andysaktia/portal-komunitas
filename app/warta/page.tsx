import { WartaExplorer } from "@/components/site/WartaExplorer";
import { getWartaList } from "@/lib/notion";
import { ORG } from "@/lib/org";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Warta & Kabar — ${ORG.short}`,
  description:
    "Kumpulan warta dan kabar kegiatan komunitas mahasiswa & alumni. Setiap warta punya halaman sendiri yang mudah dibagikan ke WhatsApp.",
  alternates: { canonical: "/warta" },
  openGraph: {
    title: `Warta & Kabar — ${ORG.short}`,
    description: "Warta bulanan, pengumuman, dan kabar kegiatan komunitas dalam satu tempat.",
    type: "website",
  },
};

export default async function WartaIndexPage() {
  const wartaList = await getWartaList();
  return <WartaExplorer wartaList={wartaList} />;
}
