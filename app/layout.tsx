import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ThemeProvider, themeBootstrapScript } from "@/components/theme-provider";
import { ORG } from "@/lib/org";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: `${ORG.name} — Portal Komunitas`,
  description: ORG.tagline,
  openGraph: {
    title: ORG.name,
    description: ORG.tagline,
    type: "website",
    locale: "id_ID",
    siteName: ORG.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#0F6E6A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
        />
        {/* Runs before hydration so first paint already has the right theme */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
