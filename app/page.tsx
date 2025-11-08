"use client";

import {
  Search,
  MessageCircle,
  FileText,
  CalendarPlus,
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  ChevronRight,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WidgetCard from "./components/WidgetCard";
import ArticleCard from "./components/ArticleCard";
import SearchModal from "./components/SearchModal";
import NotificationButton from "./components/NotificationButton";

// Dummy data untuk artikel hukum (menggantikan data-artikel lama)
const artikelHukumData = [
  {
    id: "1",
    slug: "cara-membuat-pt",
    title: "5 Langkah Mudah Mendirikan PT Perorangan",
    excerpt:
      "Pahami syarat dan prosedur terbaru untuk mendirikan PT perorangan tanpa notaris...",
    category: "Bisnis",
    readTime: 5,
    views: 1500,
    publishedAt: "2025-11-07T10:00:00Z",
    image: "/images/articles/legal-business.jpg", // Path gambar disesuaikan
  },
  {
    id: "2",
    slug: "hukum-waris",
    title: "Perbedaan Hukum Waris Perdata dan Waris Islam",
    excerpt:
      "Bagaimana pembagian harta waris diatur di Indonesia? Pahami dua sistem hukum...",
    category: "Keluarga",
    readTime: 7,
    views: 2300,
    publishedAt: "2025-11-06T09:00:00Z",
    image: "/images/articles/legal-family.jpg",
  },
  {
    id: "3",
    slug: "apa-itu-nda",
    title: "Mengapa NDA Penting Untuk Startup Anda?",
    excerpt:
      "Jangan sampai ide Anda dicuri. Pelajari pentingnya Non-Disclosure Agreement (NDA)...",
    category: "Startup",
    readTime: 4,
    views: 950,
    publishedAt: "2025-11-05T14:30:00Z",
    image: "/images/articles/legal-nda.jpg",
  },
];

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Pagi" : currentHour < 18 ? "Siang" : "Malam";

  // Format tanggal ke lokal Indonesia
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Ambil artikel hukum terbaru
  const latestArticles = artikelHukumData
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3)
    .map((artikel) => ({
      id: artikel.id,
      slug: artikel.slug,
      title: artikel.title,
      excerpt: artikel.excerpt,
      category: artikel.category,
      readTime: artikel.readTime,
      views: artikel.views.toLocaleString(),
      publishedAt: formatDate(artikel.publishedAt),
      image: artikel.image,
    }));

  interface Feature {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    description: string;
  }

  // Fitur disesuaikan untuk LegalAja
  const features: Feature[] = [
    {
      name: "Tanya Pengacara",
      icon: MessageCircle,
      href: "/konsultasi",
      description: "Chat dengan advokat",
    },
    {
      name: "Toko Dokumen",
      icon: FileText,
      href: "/toko-dokumen",
      description: "Beli & review kontrak",
    },
    {
      name: "Reservasi Jasa",
      icon: CalendarPlus,
      href: "/reservasi",
      description: "Booking notaris",
    },
    {
      name: "Cek Legalitas",
      icon: ShieldCheck,
      href: "/cek-legalitas",
      description: "Periksa status hukum",
    },
    {
      name: "Kamus Hukum",
      icon: BookOpen,
      href: "/kamus-hukum",
      description: "Glosarium istilah",
    },
    {
      name: "Bantuan Darurat",
      icon: AlertTriangle,
      href: "/bantuan-darurat",
      description: "Pendampingan cepat",
    },
  ];

  return (
    // Tema disesuaikan: bg-gradient-to-br from-blue-50 to-indigo-50
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          {/* Background disesuaikan: bg-white/90 border-gray-200/50 */}
          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm border-2 border-blue-100 flex items-center justify-center">
                  <Image
                    src="/logo-legal-app.webp" // Logo diubah
                    alt="LegalAja Logo" // Alt text diubah
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-blue-700">
                    LegalAja
                  </h1>
                  {/* Mengganti HijriDate dengan tanggal standar */}
                  <p className="text-xs text-gray-500">
                    {new Date().toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <NotificationButton />
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 transition-colors duration-200"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Welcome Banner */}
        {/* Tema disesuaikan: border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 */}
        <Card className="border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Selamat {greeting}
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              Butuh bantuan hukum hari ini?
            </p>
            {/* Kutipan diubah menjadi relevan dengan hukum */}
            <p className="text-xs text-gray-600 italic">
              &quot;Ignorantia juris non excusat&quot;
            </p>
            <p className="text-xs text-gray-500 mt-2">
              (Ketidaktahuan akan hukum tidak membebaskan seseorang dari
              tuntutan)
            </p>
          </CardContent>
        </Card>

        {/* Widget Cards */}
        <div className="grid grid-cols-2 gap-4">
          <WidgetCard
            type="service" // type diubah
            title="Konsultasi Cepat" // konten diubah
            subtitle="Hukum Perdata" // konten diubah
            status="available" // status diubah
            icon={<MessageCircle className="w-4 h-4 text-blue-600" />} // ikon & warna diubah
          />
          <WidgetCard
            type="document" // type diubah
            title="Aktivitas Dokumen" // konten diubah
            subtitle="Review Terakhir" // konten diubah
            activity="NDA v1.2.pdf" // konten diubah
            icon={<FileText className="w-4 h-4 text-indigo-600" />} // ikon & warna diubah
          />
        </div>

        {/* Feature Navigation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-blue-800">
              Layanan Kami
            </h2>
            <Link href="/features">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-blue-700 hover:bg-blue-100 transition-colors duration-200"
              >
                Lihat Semua
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.name} href={feature.href}>
                  {/* Tema disesuaikan: border-gray-200 bg-white hover:bg-gray-50 */}
                  <div className="flex flex-col items-center p-3 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:bg-gray-50 transition-all duration-200 active:scale-95 h-full">
                    {/* Tema disesuaikan: bg-blue-100 */}
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2 flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-700" /> {/* Warna ikon disesuaikan */}
                    </div>
                    <h3 className="font-medium text-gray-700 text-[10px] text-center leading-tight flex-1 flex items-center justify-center">
                      {feature.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Articles Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-blue-800">
              Info Hukum Terbaru
            </h2>
            <Link href="/artikel">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-blue-700 hover:bg-blue-100 transition-colors duration-200"
              >
                Lihat Semua
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}