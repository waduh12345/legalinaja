"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Eye,
  BookOpen,
  TrendingUp,
  Star,
  User, // Ikon header
  ArrowLeft, // Ikon header
} from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Impor Image
import { useRouter } from "next/navigation"; // Impor useRouter
import NotificationButton from "../components/NotificationButton"; // Impor NotificationButton

// --- DATA DUMMY BARU (HUKUM) ---
const categories = [
  "Semua",
  "Bisnis",
  "Properti",
  "Keluarga",
  "Pidana",
  "Startup",
];

const sortOptions = [
  { label: "Terbaru", value: "newest" },
  { label: "Terlama", value: "oldest" },
  { label: "Terpopuler", value: "popular" },
  { label: "Judul (A-Z)", value: "title" },
];

const artikelData = [
  {
    id: "1",
    slug: "5-langkah-mendirikan-pt-perorangan",
    title: "5 Langkah Mudah Mendirikan PT Perorangan di 2025",
    excerpt:
      "Pahami syarat dan prosedur terbaru untuk mendirikan PT perorangan tanpa notaris...",
    category: "Bisnis",
    tags: ["PT", "Bisnis", "Startup"],
    readTime: "5 mnt",
    views: 15200,
    publishedAt: "2025-11-08T10:00:00Z",
    featured: true,
  },
  {
    id: "2",
    slug: "memahami-hukum-waris-perdata-vs-islam",
    title: "Memahami Perbedaan Hukum Waris Perdata vs. Hukum Waris Islam",
    excerpt:
      "Bagaimana pembagian harta waris diatur di Indonesia? Pahami dua sistem hukum yang berlaku...",
    category: "Keluarga",
    tags: ["Waris", "Keluarga", "Notaris"],
    readTime: "7 mnt",
    views: 23100,
    publishedAt: "2025-11-07T09:00:00Z",
    featured: false,
  },
  {
    id: "3",
    slug: "pentingnya-nda-untuk-startup",
    title: "Mengapa NDA (Non-Disclosure Agreement) Sangat Penting Untuk Startup?",
    excerpt:
      "Jangan sampai ide brilian Anda dicuri. Pelajari pentingnya NDA untuk melindungi aset digital...",
    category: "Startup",
    tags: ["NDA", "Startup", "Kontrak"],
    readTime: "4 mnt",
    views: 9500,
    publishedAt: "2025-11-06T14:30:00Z",
    featured: true,
  },
  {
    id: "4",
    slug: "apa-yang-harus-dilakukan-saat-ditilang",
    title: "Apa yang Harus Dilakukan (dan Tidak Dilakukan) Saat Ditilang Polisi?",
    excerpt:
      "Ketahui hak dan kewajiban Anda saat menghadapi tilang di jalan agar terhindar dari...",
    category: "Pidana",
    tags: ["Tilang", "Polisi", "Pidana"],
    readTime: "6 mnt",
    views: 11200,
    publishedAt: "2025-11-05T11:00:00Z",
    featured: false,
  },
  {
    id: "5",
    slug: "prosedur-jual-beli-tanah-ajb",
    title: "Panduan Lengkap Prosedur Jual Beli Tanah dan Pembuatan AJB",
    excerpt:
      "Langkah-langkah aman membeli properti, dari pengecekan sertifikat hingga tanda tangan PPAT.",
    category: "Properti",
    tags: ["AJB", "Properti", "PPAT"],
    readTime: "8 mnt",
    views: 19800,
    publishedAt: "2025-11-04T16:00:00Z",
    featured: false,
  },
];
// --- AKHIR DATA DUMMY ---

export default function ArtikelPage() {
  const router = useRouter(); // Tambahkan router
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort artikel data
  const filteredArtikelData = useMemo(() => {
    let filtered = artikelData;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (artikel) =>
          artikel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artikel.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artikel.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter(
        (artikel) => artikel.category === selectedCategory
      );
    }

    // Sort data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
          );
        case "popular":
          return b.views - a.views;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get featured articles
  const featuredArticles = artikelData.filter((artikel) => artikel.featured);

  return (
    // Latar belakang diubah ke brand LegalAja
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20">
      {/* Header Diubah ke brand LegalAja */}
      <header className="sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-2"
                  onClick={() => router.back()} // Tombol kembali
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-lg font-bold text-blue-700">Info Hukum</h1>
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
        {/* Search (Styling LegalAja) */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari artikel (misal: 'NDA', 'Waris')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 text-base border-gray-300"
          />
        </div>

        {/* Featured Articles (Styling LegalAja) */}
        {!searchQuery && selectedCategory === "Semua" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-700" />
              <h2 className="text-lg font-semibold text-blue-800">
                Artikel Pilihan
              </h2>
            </div>

            <div className="space-y-3">
              {featuredArticles.slice(0, 2).map((artikel) => (
                <Link
                  className="block"
                  key={artikel.id}
                  href={`/artikel/${artikel.slug}`}
                >
                  <Card className="border-gray-200 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-8 h-8 text-blue-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="secondary"
                              className="text-xs bg-indigo-100 text-indigo-700"
                            >
                              {artikel.category}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-yellow-100 text-yellow-700"
                            >
                              <Star className="w-3 h-3 mr-1" />
                              Pilihan
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                            {artikel.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {artikel.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(artikel.publishedAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {artikel.readTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {artikel.views.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filters (Styling LegalAja) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-700" />
            <h2 className="text-lg font-semibold text-blue-800">
              Filter & Urutkan
            </h2>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Kategori:</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "secondary"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Urutkan berdasarkan:
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSortBy(option.value)}
                  className={`flex-shrink-0 ${
                    sortBy === option.value
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles List (Styling LegalAja) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-blue-800">
              {filteredArtikelData.length} Artikel Ditemukan
            </h2>
            {sortBy === "popular" && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-blue-700" />
                <span className="text-xs text-gray-500">Terpopuler</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {filteredArtikelData.map((artikel) => (
              <Link
                className="block"
                key={artikel.id}
                href={`/artikel/${artikel.slug}`}
              >
                <Card className="border-gray-200 hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-blue-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="secondary"
                            className="text-xs bg-indigo-100 text-indigo-700"
                          >
                            {artikel.category}
                          </Badge>
                          {artikel.featured && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-yellow-100 text-yellow-700"
                            >
                              <Star className="w-3 h-3 mr-1" />
                              Pilihan
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                          {artikel.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {artikel.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {artikel.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs text-gray-600 border-gray-300"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {artikel.tags.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs text-gray-600 border-gray-300"
                            >
                              +{artikel.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(artikel.publishedAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {artikel.readTime}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {artikel.views.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredArtikelData.length === 0 && (
            <Card className="border-gray-200">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Tidak ada artikel ditemukan
                </h3>
                <p className="text-sm text-gray-500">
                  Coba ubah kata kunci pencarian atau filter
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}