import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Mengganti font
import "./globals.css";
import PWAInstaller from "./components/PWAInstaller";
import AppWrapper from "./components/AppWrapper";
import MainLayoutWrapper from "./components/MainLayoutWrapper"; // Komponen baru untuk logika layout

// Font profesional untuk LegalAja
const inter = Inter({
  variable: "--font-sans", // Menggunakan variabel CSS --font-sans
  subsets: ["latin"],
  display: "swap",
});

// Metadata diperbarui untuk LegalAja
export const metadata: Metadata = {
  title: "LegalAja - Solusi Hukum Instan",
  description:
    "Aplikasi legal-tech untuk konsultasi pengacara, pembuatan dokumen hukum, dan layanan notaris secara on-demand.",
  keywords: [
    "legalaja",
    "hukum",
    "legal-tech",
    "pengacara",
    "notaris",
    "konsultasi hukum",
    "dokumen hukum",
    "startup",
  ],
  authors: [{ name: "LegalAja Team" }],
  creator: "LegalAja Team",
  publisher: "LegalAja",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://legalaja.id"), // Ganti dengan URL domain Anda
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LegalAja - Solusi Hukum Instan",
    description:
      "Konsultasi pengacara, buat dokumen, dan pesan notaris. Semua dalam satu aplikasi.",
    url: "https://legalaja.id",
    siteName: "LegalAja",
    images: [
      {
        url: "/legalaja/logo-og-512x512.png", // Ganti dengan path logo Anda
        width: 512,
        height: 512,
        alt: "LegalAja Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalAja - Solusi Hukum Instan",
    description:
      "Aplikasi legal-tech untuk konsultasi pengacara, pembuatan dokumen hukum, dan layanan notaris.",
    images: ["/legalaja/logo-twitter-512x512.png"], // Ganti dengan path logo Anda
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/legalaja/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/legalaja/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/legalaja/icon-apple-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LegalAja",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-TileColor": "#1D4ED8", // Warna biru brand LegalAja
    "theme-color": "#1D4ED8", // Warna biru brand LegalAja
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeColor = "#1D4ED8"; // Warna brand LegalAja

  return (
    <html lang="id">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content={themeColor} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LegalAja" />
        <meta name="msapplication-TileColor" content={themeColor} />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/legalaja/icon-apple-180x180.png" />
        {/* ... (link ikon lainnya bisa menyusul dari metadata) ... */}
      </head>
      {/* Menerapkan font Inter */}
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppWrapper>
          {/* MainLayoutWrapper akan menangani logika {children} dan BottomNavigation */}
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
        </AppWrapper>
        <PWAInstaller />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}