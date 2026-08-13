import { RenunganExplorer } from "@/components/site/RenunganExplorer";
import { getRenunganList } from "@/lib/notion";
import { ORG } from "@/lib/org";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Renungan — ${ORG.short}`,
  description:
    "Renungan singkat untuk dibaca tenang di sela kesibukan kampus dan pekerjaan. Bisa difilter per penulis dan dibagikan ke WhatsApp.",
  alternates: { canonical: "/renungan" },
  openGraph: {
    title: `Renungan — ${ORG.short}`,
    description: "Renungan mingguan komunitas mahasiswa & alumni, mudah dibaca dari HP.",
    type: "website",
  },
};

export default async function RenunganIndexPage() {
  const renunganList = await getRenunganList();
  return <RenunganExplorer renunganList={renunganList} />;
}
