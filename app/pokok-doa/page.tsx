import { PokokDoaExplorer } from "@/components/site/PokokDoaExplorer";
import { getPokokDoaList } from "@/lib/notion";
import { ORG } from "@/lib/org";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Pokok Doa — ${ORG.short}`,
  description:
    "Daftar pokok doa komunitas per pekan, ditulis singkat dalam poin-poin supaya cepat dibaca dan mudah didoakan bersama.",
  alternates: { canonical: "/pokok-doa" },
  openGraph: {
    title: `Pokok Doa — ${ORG.short}`,
    description: "Pokok doa mingguan komunitas mahasiswa & alumni, dalam bentuk poin singkat.",
    type: "website",
  },
};

export default async function PokokDoaPage() {
  const pokokDoaList = await getPokokDoaList();
  return <PokokDoaExplorer pokokDoaList={pokokDoaList} />;
}
