import { LaporanExplorer } from "@/components/site/LaporanExplorer";
import { getLaporanList } from "@/lib/notion";
import { ORG } from "@/lib/org";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Laporan Keuangan — ${ORG.short}`,
  description:
    "Laporan keuangan komunitas per periode. Halaman ini dilindungi kode akses sederhana untuk pengurus dan donatur.",
  alternates: { canonical: "/laporan-keuangan" },
  robots: { index: false },
  openGraph: {
    title: `Laporan Keuangan — ${ORG.short}`,
    description: "Transparansi keuangan komunitas, dibuka dengan kode akses dari sekretariat.",
    type: "website",
  },
};

export default async function LaporanKeuanganPage() {
  const laporanList = await getLaporanList();
  return <LaporanExplorer laporanList={laporanList} />;
}
