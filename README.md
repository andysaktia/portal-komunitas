# Portal Komunitas Salatiga

**Layer:** Consumer
**Bergantung pada:** Notion (CMS eksternal — lihat catatan di bawah, bukan bagian dari rantai Data→Service→Consumer internal)
**Dipakai oleh:** —
**Status pengecualian arsitektur:** Tidak ada (Notion sebagai CMS eksternal adalah pola yang sudah dipakai di `shemalens` dan Perkantas portal — bukan static/offline-first bundling, jadi bukan klausa pengecualian bagian 3)

## Deskripsi

Portal komunitas untuk mahasiswa & alumni: Warta, Pokok Doa, Renungan, Galeri Kegiatan, Laporan Keuangan, dan halaman Tentang. Dimigrasi dari prototipe visual Lovable/Vite (TanStack Router) ke Next.js App Router, mengikuti playbook yang sama dengan `shemalens`:

1. Desain visual di Lovable (selesai — sumber prototipe).
2. Migrasi struktur ke Next.js dengan data mock/fallback (**tahap ini — sudah selesai**, lihat `lib/mock-data.ts`).
3. Sambungkan Notion sebagai CMS (skema di bawah — **PR utama, belum dieksekusi**).
4. Deploy ke Vercel.

`npm run dev` sudah bisa jalan sekarang juga tanpa satu pun database Notion dibuat — setiap fungsi di `lib/notion.ts` otomatis fallback ke `lib/mock-data.ts` kalau env var terkait kosong.

## Jika Consumer dengan Pengecualian Static/Offline-First

Tidak berlaku — proyek ini fetch dari Notion (server-side, di-cache lewat `unstable_cache`), bukan bundling data ke build artifact.

## Skema Notion (8 database)

Data `ORG` (nama, tagline, kontak, sosmed) **sengaja tidak dimasukkan ke Notion** — itu jarang berubah dan bukan "konten" yang perlu diedit non-teknis. Ada di `lib/org.ts`.

### 1. Warta
| Properti | Tipe Notion |
|---|---|
| Title | Title |
| Slug | Text |
| Date | Date |
| Category | Select |
| Excerpt | Text |
| Cover | Files & media |
| *(isi/body)* | Page content — tulis langsung di body halaman Notion (paragraf, Heading 2/3, quote, bulleted list didukung) |

### 2. Renungan
| Properti | Tipe |
|---|---|
| Title | Title |
| Slug | Text |
| Date | Date |
| Author | Text |
| Verse | Text |
| Excerpt | Text |
| Cover | Files & media |
| *(isi/body)* | Page content |

### 3. PokokDoaPeriode
| Properti | Tipe |
|---|---|
| Periode | Title |
| Month | Date |
| Rentang | Text |
| Aktif | Checkbox |
| Poin | Relation → PokokDoaPoin |

### 4. PokokDoaPoin
| Properti | Tipe |
|---|---|
| Topik | Title |
| Detail | Text |
| *(relation balik ke Periode dibuat otomatis oleh Notion)* | Relation |

### 5. GaleriEvent
| Properti | Tipe |
|---|---|
| Title | Title |
| Slug | Text |
| Date | Date |
| Location | Text |
| Cover | Files & media |
| Photos | Relation → GaleriPhoto |

### 6. GaleriPhoto
| Properti | Tipe |
|---|---|
| Caption | Title |
| Image | Files & media |
| *(relation balik ke Event dibuat otomatis oleh Notion)* | Relation |

### 7. LaporanKeuangan
| Properti | Tipe |
|---|---|
| Periode | Title |
| Masuk | Number |
| Keluar | Number |
| Saldo | Number |
| Catatan | Text |

### 8. Pengurus
| Properti | Tipe |
|---|---|
| Name | Title |
| Role | Text |
| Photo | Files & media |

> Catatan penamaan properti: nama kolom di atas **case-sensitive** dan harus persis sama dengan yang dibaca `lib/notion.ts`. Kalau mau ganti nama kolom, update juga mapping-nya di sana.

## Setup Notion

1. Buat integration di [notion.so/my-integrations](https://notion.so/my-integrations), salin token-nya.
2. Buat 8 database di atas (bisa dalam satu halaman Notion sebagai sub-page).
3. Untuk tiap database: klik "..." → Connections → hubungkan ke integration yang baru dibuat.
4. Salin database ID (32 karakter di URL database) ke `.env.local` (contoh di `.env.example`).
5. Isi minimal 1 baris data di tiap database untuk tes.
6. `npm run dev` — begitu env var terisi, data otomatis ditarik dari Notion; kalau kosong, tetap fallback ke mock data.

## Development

```bash
npm install
cp .env.example .env.local   # isi setelah Notion siap; boleh dikosongkan dulu
npm run dev
```

## Struktur

```
app/                  # Next.js App Router pages
components/site/      # UI components (di-port dari prototipe Lovable)
components/theme-provider.tsx
lib/notion.ts         # Data access layer: Notion fetch + fallback ke mock
lib/mock-data.ts       # Fallback/dev data (sumber: prototipe Lovable)
lib/org.ts             # Konfigurasi branding statis (bukan konten Notion)
lib/types.ts            # Tipe data bersama
```
