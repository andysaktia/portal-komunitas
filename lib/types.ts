export type Warta = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  cover: string;
  category: string;
  body: string[]; // simple markdown-ish blocks: "## heading", "> quote", plain paragraph
};

export type Renungan = {
  slug: string;
  title: string;
  date: string;
  author: string;
  verse: string;
  excerpt: string;
  cover: string;
  body: string[];
};

export type PokokDoaPeriode = {
  id: string;
  periode: string;
  month: string; // YYYY-MM
  rentang: string;
  aktif: boolean;
  poin: { topik: string; detail: string }[];
};

export type GaleriEvent = {
  slug: string;
  title: string;
  date: string;
  location: string;
  cover: string;
  photos: { src: string; caption: string }[];
};

export type Laporan = {
  id: string;
  periode: string;
  masuk: number;
  keluar: number;
  saldo: number;
  catatan: string;
};

export type Pengurus = {
  name: string;
  role: string;
  photo: string;
};
