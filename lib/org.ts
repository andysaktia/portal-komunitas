/**
 * Branding & contact info. This stays as a code constant on purpose — it
 * rarely changes and isn't "content" a non-technical editor needs to touch.
 * Everything that IS regularly edited (warta, renungan, pokok doa, galeri,
 * laporan keuangan, pengurus) lives in Notion instead — see lib/notion.ts.
 */
export const ORG = {
  name: "Portal Komunitas Salatiga",
  short: "PK Salatiga",
  tagline:
    "Satu tempat untuk warta, pokok doa, renungan, dan foto kegiatan komunitas mahasiswa & alumni.",
  city: "Salatiga, Jawa Tengah",
  email: "sekretariat@pksalatiga.org",
  phone: "+62 812-0000-1234",
  waGroup: "https://chat.whatsapp.com/",
  instagram: "https://instagram.com/",
  youtube: "https://youtube.com/",
  address: "Jl. Diponegoro No. 52, Salatiga",
};

export function formatTanggal(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}
