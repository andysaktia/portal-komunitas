# Portal Komunitas

**Infrastruktur digital sederhana untuk yayasan & komunitas non-profit** — warta, pokok doa, renungan, galeri kegiatan, dan laporan keuangan dalam satu tautan yang bisa dibagikan, tanpa PDF yang tercecer di grup WhatsApp dan tanpa biaya developer berulang.

[Notion](https://www.notion.so/) sebagai CMS · [Next.js](https://nextjs.org/) App Router · Deploy ke [Vercel](https://vercel.com/)

---

## Mengapa proyek ini dibuat

Banyak komunitas dan yayasan kecil — persekutuan mahasiswa, gereja lokal, badan pelayanan — mengelola informasinya lewat kombinasi PDF di grup WhatsApp, folder Google Drive yang membengkak, dan spreadsheet laporan keuangan yang cuma bisa dibaca pengurus inti. Informasi ada, tapi sulit ditemukan kembali dan mudah hilang saat pergantian kepengurusan.

Proyek ini dibangun sebagai **bukti konsep infrastruktur digital yang layak dipakai organisasi non-profit sungguhan** — bukan situs statis yang butuh developer setiap kali ada warta baru, tapi platform yang bisa **diisi dan dikelola sepenuhnya oleh pengurus non-teknis lewat Notion**, sementara situsnya sendiri tetap cepat, SEO-friendly, dan mudah dibagikan.

Dibangun sebagai bagian dari portofolio teknis penulis di bidang **Biblical Computing & church technology**, dengan tujuan jangka panjang menunjukkan kapabilitas kepada mitra digital ministry seperti **SABDA YLSA**.

## Fitur

| Halaman | Fungsi |
|---|---|
| **Warta** | Kabar & pengumuman bulanan, dengan kategori dan pencarian |
| **Pokok Doa** | Poin doa mingguan, dikelompokkan per periode, siap dibagikan ke WhatsApp satu ketuk |
| **Renungan** | Bacaan singkat dengan filter per penulis |
| **Galeri** | Foto kegiatan per acara, dengan lightbox — tanpa perlu buka Google Drive |
| **Laporan Keuangan** | Transparansi keuangan untuk pengurus & donatur, dilindungi kode akses sederhana |
| **Tentang** | Visi, misi, sejarah, dan profil pengurus |

Semua konten dikelola lewat **database Notion** — pengurus tinggal isi tabel, tanpa sentuh kode. Lihat [`NOTION_SETUP.md`](./NOTION_SETUP.md) untuk panduan setup lengkap.

## Arsitektur

Proyek ini mengikuti prinsip **3-layer architecture** (Data → Service → Consumer) yang dipakai konsisten di seluruh ekosistem proyek penulis:

**Layer:** Consumer
**Bergantung pada:** Notion (CMS eksternal — di luar rantai Data→Service→Consumer internal, pola yang sama dipakai di proyek `shemalens`)
**Dipakai oleh:** —
**Status pengecualian arsitektur:** Tidak ada — data di-fetch dari Notion secara server-side dan di-cache (`unstable_cache`), bukan dibundel statis ke build

Setiap fungsi pengambilan data (`lib/notion.ts`) otomatis **fallback ke data contoh** kalau environment variable Notion belum diisi — situs tetap bisa dijalankan dan ditinjau (`npm run dev`) sebelum satu pun database Notion dibuat.

## Tumpukan teknologi

- **Framework:** Next.js 15 (App Router, React Server Components)
- **CMS:** Notion API (`@notionhq/client`)
- **Styling:** Tailwind CSS v4, desain sistem custom (light/dark mode)
- **Bahasa:** TypeScript
- **Deploy:** Vercel

## Memulai

```bash
npm install
cp .env.example .env.local   # isi setelah database Notion siap; boleh dikosongkan dulu
npm run dev
```

Situs langsung berjalan dengan data contoh. Untuk menyambungkan data organisasi asli, ikuti [`NOTION_SETUP.md`](./NOTION_SETUP.md) — mencakup pembuatan integration, skema 8 database, relasi antar-tabel, hingga pengambilan Database ID.

## Struktur proyek

```
app/                    # Next.js App Router — halaman & routing
components/site/        # Komponen UI (Navbar, ContentCard, galeri, dsb.)
lib/notion.ts            # Data access layer: fetch Notion + fallback otomatis
lib/mock-data.ts          # Data contoh untuk pengembangan lokal
lib/org.ts                 # Konfigurasi branding statis (bukan konten Notion)
lib/types.ts                # Tipe data bersama
```

## Skema data (Notion)

| Database | Isi |
|---|---|
| `Warta` | Kabar & pengumuman |
| `Renungan` | Bacaan renungan |
| `PokokDoaPeriode` + `PokokDoaPoin` | Pokok doa per periode (relasi one-to-many) |
| `GaleriEvent` + `GaleriPhoto` | Album foto per kegiatan (relasi one-to-many) |
| `LaporanKeuangan` | Ringkasan keuangan per periode |
| `Pengurus` | Profil pengurus inti |

Detail nama kolom, tipe field, dan cara membuat relasi antar-database ada di [`NOTION_SETUP.md`](./NOTION_SETUP.md).

## Roadmap

- [ ] Integrasi auth sungguhan untuk halaman Laporan Keuangan (saat ini gerbang kode akses sederhana, hanya untuk demo)
- [ ] Backup terjadwal database Notion ke JSON (antisipasi downtime/kehilangan akses)
- [ ] RSS feed untuk Warta & Renungan
- [ ] Draft/scheduled publishing untuk konten Notion

## Lisensi

MIT — silakan digunakan atau dimodifikasi untuk komunitas/yayasan lain.

---

Dibangun oleh [nama kamu] sebagai bagian dari portofolio **Biblical Computing & Church Technology**. Lihat proyek terkait lain di ekosistem ini: `shemalens` (blog dwibahasa Tech/AI/Bible), `strongs-dictionary-json` (dataset leksikon Ibrani-Yunani), dan `fast-bible-api` (API teks Alkitab Indonesia).