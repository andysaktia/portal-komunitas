import type { GaleriEvent, Laporan, Pengurus, PokokDoaPeriode, Renungan, Warta } from "./types";

// Placeholder covers (deterministic picsum seeds) since the Lovable export
// didn't include real image assets. Swap for real photos once they're in
// Notion — this file only exists as a fallback for local dev / before the
// Notion databases are populated (see lib/notion.ts).
const coverWarta = "https://picsum.photos/seed/warta/1200/800";
const coverRenungan = "https://picsum.photos/seed/renungan/1200/800";
const coverDoa = "https://picsum.photos/seed/doa/1200/800";
const heroCommunity = "https://picsum.photos/seed/komunitas/1600/1000";

export const mockWartaList: Warta[] = [
  {
    slug: "warta-agustus-2026-pekan-orientasi",
    title: "Warta Agustus: Pekan Orientasi Mahasiswa Baru",
    date: "2026-08-03",
    excerpt:
      "Tiga kampus, 140 mahasiswa baru, dan satu pekan penuh perjumpaan. Berikut rangkuman kegiatan dan jadwal kelompok kecil yang baru dibuka.",
    cover: coverWarta,
    category: "Warta Bulanan",
    body: [
      "Pekan Orientasi Mahasiswa Baru tahun ini berlangsung 28 Juli – 1 Agustus di tiga kampus mitra. Total 140 mahasiswa baru hadir, meningkat dari 96 orang tahun lalu.",
      "Sesi pembuka diisi dengan perkenalan komunitas, pemaparan visi pelayanan mahasiswa, dan pembagian kelompok kecil. Setiap kelompok kecil kini diisi maksimal delapan orang agar percakapan tetap hangat dan personal.",
      "## Kelompok kecil baru\nEnam kelompok kecil baru dibuka mulai minggu kedua Agustus. Jadwal dan titik temu bisa ditanyakan ke koordinator kampus masing-masing.",
      "## Ucapan terima kasih\nTerima kasih untuk 22 alumni yang hadir sebagai fasilitator, dan untuk keluarga-keluarga yang membuka rumahnya sebagai tempat pertemuan.",
    ],
  },
  {
    slug: "retret-alumni-juli-2026",
    title: "Retret Alumni 2026: Bekerja Tanpa Kehilangan Arah",
    date: "2026-07-12",
    excerpt:
      "Dua hari di Kopeng bersama 60 alumni. Rangkuman sesi, hasil diskusi kelompok, dan tautan galeri foto lengkap.",
    cover: heroCommunity,
    category: "Kegiatan",
    body: [
      "Retret Alumni 2026 diikuti 60 alumni dari berbagai bidang pekerjaan, berlangsung 5–6 Juli di Kopeng.",
      "Tema tahun ini adalah panggilan di tempat kerja: bagaimana pekerjaan sehari-hari tetap punya arah ketika tuntutan karier makin besar.",
      "## Hasil diskusi\nTiga kelompok diskusi menghasilkan usulan konkret: mentoring alumni–mahasiswa, kelas persiapan kerja dua bulanan, dan dana beasiswa kecil untuk mahasiswa tingkat akhir.",
      "Foto-foto kegiatan sudah tersedia di halaman Galeri dan bisa dilihat langsung tanpa perlu mengunduh.",
    ],
  },
  {
    slug: "pelatihan-pemimpin-kelompok-kecil",
    title: "Pelatihan Pemimpin Kelompok Kecil Angkatan XII",
    date: "2026-06-21",
    excerpt:
      "18 peserta menyelesaikan pelatihan tiga sesi tentang membaca teks, bertanya baik, dan mendampingi anggota kelompok.",
    cover: coverRenungan,
    category: "Pembinaan",
    body: [
      "Pelatihan Pemimpin Kelompok Kecil Angkatan XII diselesaikan oleh 18 peserta dari lima kampus.",
      "Materi mencakup cara membaca teks secara utuh, menyusun pertanyaan yang membuka percakapan, serta mendampingi anggota kelompok yang sedang bergumul.",
      "## Langkah lanjut\nSetiap peserta akan didampingi seorang mentor selama satu semester, dengan pertemuan evaluasi setiap enam minggu.",
    ],
  },
  {
    slug: "buka-donasi-beasiswa-semester-ganjil",
    title: "Buka Donasi Beasiswa Semester Ganjil",
    date: "2026-06-02",
    excerpt:
      "Sembilan mahasiswa mengajukan bantuan biaya kuliah semester ini. Berikut mekanisme donasi dan pelaporannya.",
    cover: coverDoa,
    category: "Pengumuman",
    body: [
      "Sembilan mahasiswa mengajukan bantuan biaya kuliah untuk semester ganjil 2026/2027. Kebutuhan total Rp 27.500.000.",
      "Donasi disalurkan melalui rekening sekretariat dan dilaporkan setiap bulan pada halaman Laporan Keuangan.",
      "## Cara berdonasi\nHubungi sekretariat melalui WhatsApp untuk mendapatkan nomor rekening dan format konfirmasi transfer.",
    ],
  },
];

export const mockRenunganList: Renungan[] = [
  {
    slug: "tenang-di-tengah-semester-padat",
    title: "Tenang di Tengah Semester yang Padat",
    date: "2026-08-05",
    author: "Sdri. Ratih Puspita",
    verse: "Mazmur 46:11",
    excerpt:
      "Ketenangan bukan berarti tidak ada tuntutan. Ia lahir ketika kita berhenti sejenak dan mengingat siapa yang memegang hari ini.",
    cover: coverRenungan,
    body: [
      "Minggu-minggu pertama semester selalu terasa seperti berlari sebelum sempat memakai sepatu. Jadwal menumpuk, tugas datang bersamaan, dan waktu berhenti terasa mewah.",
      '> "Diamlah dan ketahuilah, bahwa Akulah Allah."',
      "Kata 'diam' di sini bukan perintah untuk pasif. Ia undangan untuk berhenti bergerak sebentar agar bisa mengingat kembali: hari ini tidak ditopang oleh kekuatan kita sendiri.",
      "## Untuk direnungkan\nApa satu hal kecil yang bisa kamu hentikan minggu ini supaya ada ruang untuk berhenti dan berdoa?",
    ],
  },
  {
    slug: "belajar-mendengar-sebelum-menjawab",
    title: "Belajar Mendengar Sebelum Menjawab",
    date: "2026-07-29",
    author: "Bpk. Yosafat Lim",
    verse: "Yakobus 1:19",
    excerpt:
      "Dalam kelompok kecil, kemampuan yang paling jarang dilatih bukan berbicara, tapi mendengar sampai selesai.",
    cover: coverWarta,
    body: [
      "Banyak percakapan gagal bukan karena kita kurang pandai menjawab, tapi karena kita menjawab terlalu cepat.",
      '> "Setiap orang hendaklah cepat untuk mendengar, tetapi lambat untuk berkata-kata."',
      "Mendengar sampai selesai adalah bentuk penghormatan paling sederhana yang bisa kita berikan kepada seseorang yang sedang bergumul.",
      "## Untuk direnungkan\nSiapa satu orang yang perlu kamu dengarkan minggu ini tanpa buru-buru memberi saran?",
    ],
  },
  {
    slug: "pekerjaan-kecil-yang-setia",
    title: "Pekerjaan Kecil yang Setia",
    date: "2026-07-15",
    author: "Sdri. Ratih Puspita",
    verse: "Kolose 3:23",
    excerpt:
      "Tidak semua pekerjaan terlihat. Tapi kesetiaan pada yang kecil membentuk kita jauh sebelum ada yang memperhatikan.",
    cover: heroCommunity,
    body: [
      "Menyusun kursi, mengingatkan jadwal, menyalin catatan pertemuan. Pekerjaan-pekerjaan ini tidak pernah masuk laporan tahunan, tapi tanpanya komunitas berhenti berjalan.",
      '> "Apa pun juga yang kamu perbuat, perbuatlah dengan segenap hatimu."',
      "Kesetiaan pada yang kecil bukan latihan menuju hal besar. Ia sendiri sudah bernilai.",
    ],
  },
  {
    slug: "ketika-doa-terasa-kering",
    title: "Ketika Doa Terasa Kering",
    date: "2026-06-30",
    author: "Sdr. Bimo Nugroho",
    verse: "Roma 8:26",
    excerpt: "Ada masa ketika doa hanya terasa seperti mengulang kata. Itu bukan tanda kegagalan.",
    cover: coverDoa,
    body: [
      "Ada minggu-minggu ketika berdoa terasa seperti berbicara ke ruang kosong. Kalimat yang sama, keluhan yang sama, tanpa rasa apa pun.",
      '> "Roh sendiri berdoa untuk kita kepada Allah dengan keluhan-keluhan yang tidak terucapkan."',
      "Kekeringan bukan bukti bahwa doa kita tidak didengar. Kadang justru di titik itu kita belajar bahwa doa tidak bergantung pada perasaan kita.",
    ],
  },
];

export const mockPokokDoaList: PokokDoaPeriode[] = [
  {
    id: "agustus-2026-pekan-1",
    periode: "Agustus 2026 — Pekan 1",
    month: "2026-08",
    rentang: "3–9 Agustus 2026",
    aktif: true,
    poin: [
      { topik: "Mahasiswa baru", detail: "140 mahasiswa baru yang mulai bergabung di kelompok kecil — kiranya menemukan teman seperjalanan." },
      { topik: "Pemimpin kelompok kecil", detail: "18 pemimpin baru Angkatan XII yang mulai mendampingi kelompok masing-masing." },
      { topik: "Beasiswa", detail: "Sembilan mahasiswa yang menantikan bantuan biaya kuliah semester ganjil." },
      { topik: "Kesehatan", detail: "Ibu Ratna (pengurus sekretariat) yang sedang dalam pemulihan setelah operasi." },
      { topik: "Sekretariat", detail: "Perpanjangan sewa ruang sekretariat yang berakhir September." },
    ],
  },
  {
    id: "juli-2026-pekan-4",
    periode: "Juli 2026 — Pekan 4",
    month: "2026-07",
    rentang: "27 Juli – 2 Agustus 2026",
    aktif: false,
    poin: [
      { topik: "Persiapan orientasi", detail: "Panitia Pekan Orientasi Mahasiswa Baru dan 22 alumni fasilitator." },
      { topik: "Alumni", detail: "Alumni yang sedang mencari pekerjaan pertama setelah lulus Juni." },
      { topik: "Kampus mitra", detail: "Izin kegiatan di dua kampus baru yang masih diproses." },
    ],
  },
  {
    id: "juli-2026-pekan-2",
    periode: "Juli 2026 — Pekan 2",
    month: "2026-07",
    rentang: "13–19 Juli 2026",
    aktif: false,
    poin: [
      { topik: "Retret alumni", detail: "Tindak lanjut hasil diskusi retret: mentoring, kelas persiapan kerja, dana beasiswa." },
      { topik: "Keluarga", detail: "Keluarga Sdr. Bimo yang sedang berduka atas meninggalnya ayah beliau." },
      { topik: "Keuangan", detail: "Kebutuhan operasional bulanan sekretariat sebesar Rp 6.400.000." },
    ],
  },
  {
    id: "juni-2026-pekan-3",
    periode: "Juni 2026 — Pekan 3",
    month: "2026-06",
    rentang: "15–21 Juni 2026",
    aktif: false,
    poin: [
      { topik: "Pelatihan", detail: "Peserta Pelatihan Pemimpin Kelompok Kecil Angkatan XII." },
      { topik: "Mahasiswa tingkat akhir", detail: "Mahasiswa yang sedang menyusun skripsi dan menghadapi sidang." },
    ],
  },
];

export const mockGaleriEvents: GaleriEvent[] = [
  {
    slug: "retret-alumni-2026",
    title: "Retret Alumni 2026",
    date: "2026-07-05",
    location: "Kopeng, Semarang",
    cover: heroCommunity,
    photos: [
      { src: heroCommunity, caption: "Sesi diskusi kelompok pagi hari" },
      { src: coverWarta, caption: "Foto bersama seluruh peserta" },
      { src: coverDoa, caption: "Waktu doa penutup" },
      { src: coverRenungan, caption: "Catatan hasil diskusi kelompok" },
    ],
  },
  {
    slug: "pekan-orientasi-2026",
    title: "Pekan Orientasi Mahasiswa Baru 2026",
    date: "2026-07-30",
    location: "Tiga kampus mitra, Salatiga",
    cover: coverWarta,
    photos: [
      { src: coverWarta, caption: "Perkenalan komunitas di lapangan kampus" },
      { src: heroCommunity, caption: "Sesi kelompok kecil pertama" },
      { src: coverDoa, caption: "Doa pembuka bersama panitia" },
    ],
  },
  {
    slug: "pelatihan-pkk-angkatan-xii",
    title: "Pelatihan PKK Angkatan XII",
    date: "2026-06-20",
    location: "Sekretariat Salatiga",
    cover: coverRenungan,
    photos: [
      { src: coverRenungan, caption: "Sesi membaca teks bersama" },
      { src: heroCommunity, caption: "Latihan memimpin diskusi" },
    ],
  },
  {
    slug: "doa-bulanan-juni",
    title: "Persekutuan Doa Bulanan Juni",
    date: "2026-06-08",
    location: "Rumah keluarga Tanuwijaya",
    cover: coverDoa,
    photos: [
      { src: coverDoa, caption: "Persekutuan doa malam" },
      { src: coverRenungan, caption: "Pembacaan pokok doa bulanan" },
    ],
  },
];

export const mockLaporanList: Laporan[] = [
  { id: "2026-07", periode: "Juli 2026", masuk: 18450000, keluar: 15120000, saldo: 24380000, catatan: "Termasuk pemasukan retret alumni Rp 9.000.000." },
  { id: "2026-06", periode: "Juni 2026", masuk: 12200000, keluar: 10940000, saldo: 21050000, catatan: "Pengeluaran pelatihan PKK Angkatan XII." },
  { id: "2026-05", periode: "Mei 2026", masuk: 11800000, keluar: 11310000, saldo: 19790000, catatan: "Operasional normal." },
  { id: "2026-04", periode: "April 2026", masuk: 13400000, keluar: 9880000, saldo: 19300000, catatan: "Donasi beasiswa dua donatur baru." },
];

export const mockPengurus: Pengurus[] = [
  { name: "Yosafat Lim", role: "Ketua Yayasan", photo: heroCommunity },
  { name: "Ratih Puspita", role: "Staf Pelayanan Mahasiswa", photo: coverRenungan },
  { name: "Bimo Nugroho", role: "Koordinator Alumni", photo: coverWarta },
  { name: "Ratna Wijaya", role: "Sekretariat & Keuangan", photo: coverDoa },
  { name: "Elisa Hartono", role: "Koordinator Doa", photo: coverDoa },
  { name: "Daniel Sitorus", role: "Media & Dokumentasi", photo: coverWarta },
];
