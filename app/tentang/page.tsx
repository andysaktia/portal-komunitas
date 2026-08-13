import { getPengurus } from "@/lib/notion";
import { ORG } from "@/lib/org";
import { Compass, Mail, MapPin, MessageCircle, Phone, Target } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: `Tentang Kami — ${ORG.short}`,
  description:
    "Visi, misi, sejarah singkat, dan pengurus inti yayasan pelayanan mahasiswa & alumni di Salatiga, beserta cara bergabung.",
  alternates: { canonical: "/tentang" },
  openGraph: {
    title: `Tentang ${ORG.name}`,
    description: "Komunitas pelayanan mahasiswa & alumni tingkat kota. Kenali visi, misi, dan pengurus kami.",
    type: "website",
  },
};

const sejarah = [
  { tahun: "2009", teks: "Dimulai dari satu kelompok kecil berisi tujuh mahasiswa di sebuah rumah kos." },
  { tahun: "2014", teks: "Pelatihan pemimpin kelompok kecil angkatan pertama diadakan; pelayanan meluas ke tiga kampus." },
  { tahun: "2019", teks: "Persekutuan alumni terbentuk, disusul program mentoring alumni–mahasiswa." },
  { tahun: "2026", teks: "Portal komunitas ini dibuat agar warta, pokok doa, renungan, dan foto tidak lagi tercecer di grup WhatsApp." },
];

export default async function TentangPage() {
  const pengurus = await getPengurus();

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:py-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">Tentang kami</p>
            <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">
              Menemani mahasiswa & alumni bertumbuh di kotanya sendiri
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {ORG.name} adalah komunitas pelayanan mahasiswa dan alumni tingkat kota. Kami bekerja lewat
              kelompok kecil, pembinaan pemimpin, dan persekutuan alumni di {ORG.city}.
            </p>
          </div>
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-soft">
            <Image
              src="https://picsum.photos/seed/komunitas/1600/1000"
              alt="Kelompok kecil mahasiswa sedang berdiskusi"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="card-soft p-6">
            <div className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
              <Compass className="size-5" />
            </div>
            <h2 className="mt-4 text-xl">Visi</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Terbentuknya mahasiswa dan alumni yang berakar kuat, berpikir jernih, dan melayani masyarakat di
              bidang panggilannya masing-masing.
            </p>
          </div>
          <div className="card-soft p-6">
            <div className="grid size-11 place-items-center rounded-xl bg-secondary-soft text-secondary-foreground">
              <Target className="size-5" />
            </div>
            <h2 className="mt-4 text-xl">Misi</h2>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>· Membina kelompok kecil di kampus-kampus mitra.</li>
              <li>· Melatih pemimpin kelompok kecil setiap tahun.</li>
              <li>· Menghubungkan alumni sebagai mentor bagi mahasiswa.</li>
              <li>· Menjaga transparansi pelayanan dan keuangan.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl">Pengurus & anggota inti</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Tim kecil yang menjaga pelayanan tetap berjalan sehari-hari.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3">
          {pengurus.map((p) => (
            <div key={p.name} className="card-soft overflow-hidden">
              <div className="relative aspect-square w-full">
                <Image src={p.photo} alt={p.name} fill sizes="240px" className="object-cover" />
              </div>
              <div className="p-4">
                <p className="font-display text-base font-semibold">{p.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="card-soft p-6 sm:p-8">
          <h2 className="text-2xl">Sejarah singkat</h2>
          <div className="mt-5 space-y-5 border-l border-border pl-5">
            {sejarah.map((s) => (
              <div key={s.tahun} className="relative">
                <span className="absolute top-1.5 -left-[27px] size-3 rounded-full bg-primary" />
                <p className="font-display text-base font-semibold text-primary">{s.tahun}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.teks}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="card-soft p-6 sm:p-8">
          <h2 className="text-2xl">Kontak & cara bergabung</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Siapa pun boleh ikut kelompok kecil, tidak perlu pendaftaran resmi. Hubungi kami lewat WhatsApp,
            sebutkan kampus dan jurusanmu, dan kami akan menghubungkanmu dengan kelompok terdekat.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              {ORG.address}
            </p>
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              {ORG.email}
            </p>
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              {ORG.phone}
            </p>
          </div>
          <a
            href={ORG.waGroup}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-4" /> Gabung grup WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
