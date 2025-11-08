"use client";

import { Search, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NotificationButton from "../components/NotificationButton";
import { Input } from "@/components/ui/input";

// --- Tipe Data untuk Kamus ---
type DictionaryItem = {
  id: string;
  term: string;
  definition: string;
};

// --- Dummy Data untuk Kamus Hukum ---
const dictionaryData: DictionaryItem[] = [
  {
    id: "1",
    term: "Advokat",
    definition:
      "Seseorang yang berprofesi memberi jasa hukum, baik di dalam maupun di luar pengadilan yang memenuhi persyaratan berdasarkan undang-undang.",
  },
  {
    id: "2",
    term: "Akta Otentik",
    definition:
      "Akta yang dibuat dalam bentuk yang ditentukan oleh undang-undang, oleh atau di hadapan pejabat umum yang berwenang untuk itu di tempat akta dibuat.",
  },
  {
    id: "3",
    term: "Alinea",
    definition: "Bagian dari suatu pasal atau ayat yang berdiri sendiri.",
  },
  {
    id: "4",
    term: "Banding",
    definition:
      "Upaya hukum yang dilakukan oleh terdakwa atau jaksa penuntut umum terhadap putusan pengadilan tingkat pertama (Pengadilan Negeri).",
  },
  {
    id: "5",
    term: "Burgerlijk Wetboek (BW)",
    definition:
      "Dikenal juga sebagai Kitab Undang-Undang Hukum Perdata (KUHPerdata). Merupakan induk peraturan hukum perdata di Indonesia.",
  },
  {
    id: "6",
    term: "Debitor",
    definition:
      "Pihak yang mempunyai utang atau kewajiban untuk memenuhi suatu prestasi kepada pihak lain (kreditor).",
  },
  {
    id: "7",
    term: "Daluwarsa (Verjaring)",
    definition:
      "Lewatnya waktu yang ditetapkan undang-undang sehingga menimbulkan akibat hukum tertentu, seperti hilangnya hak untuk menuntut.",
  },
  {
    id: "8",
    term: "Gugatan",
    definition:
      "Tuntutan hak yang diajukan oleh penggugat kepada tergugat melalui pengadilan.",
  },
  {
    id: "9",
    term: "Kreditor",
    definition:
      "Pihak yang mempunyai piutang atau hak untuk menuntut suatu prestasi dari pihak lain (debitor).",
  },
  {
    id: "10",
    term: "Kasasi",
    definition:
      "Upaya hukum yang dapat diajukan oleh pihak yang berperkara terhadap putusan pengadilan tingkat banding (Pengadilan Tinggi) ke Mahkamah Agung.",
  },
  {
    id: "11",
    term: "Perdata",
    definition:
      "Hukum yang mengatur hubungan antara orang perorangan yang satu dengan yang lain, dengan menitikberatkan pada kepentingan perseorangan.",
  },
  {
    id: "12",
    term: "Pidana",
    definition:
      "Hukum yang mengatur perbuatan-perbuatan yang dilarang oleh undang-undang dan sanksi bagi yang melanggarnya, demi kepentingan umum.",
  },
  {
    id: "13",
    term: "PPAT",
    definition:
      "Pejabat Pembuat Akta Tanah. Pejabat umum yang diberi kewenangan untuk membuat akta-akta otentik mengenai perbuatan hukum tertentu terkait hak atas tanah.",
  },
  {
    id: "14",
    term: "Waris",
    definition:
      "Orang yang berhak menerima harta peninggalan dari orang yang telah meninggal dunia (pewaris).",
  },
];

// Generate alfabet
const alphabet = ["All", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

export default function KamusHukumPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("All");

  // --- Logika Filter ---
  const filteredTerms = dictionaryData.filter((item) => {
    const byLetter =
      selectedLetter === "All" ||
      item.term.toUpperCase().startsWith(selectedLetter);

    const bySearch =
      !searchTerm ||
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());

    return byLetter && bySearch;
  });

  // --- Logika Grouping ---
  const groupedTerms = filteredTerms.reduce((acc, item) => {
    const letter = item.term[0].toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(item);
    return acc;
  }, {} as Record<string, DictionaryItem[]>);

  return (
    // Tema disesuaikan: bg-gradient-to-br from-blue-50 to-indigo-50
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20">
      {/* Header - Konsisten */}
      <header className="sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm border-2 border-blue-100 flex items-center justify-center">
                  <Image
                    src="/logo-legal-app.webp"
                    alt="LegalAja Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-blue-700">LegalAja</h1>
                  <p className="text-xs text-gray-500">Solusi Hukum Anda</p>
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
        {/* Judul Halaman */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-800">Kamus Hukum</h2>
          <p className="text-sm text-gray-600">
            Pahami istilah hukum dengan mudah.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari istilah (misal: 'kasasi', 'debitor')..."
            className="pl-10 h-11 text-base border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Filter Alfabet */}
        <div className="flex gap-2 pb-2 overflow-x-auto">
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "default" : "secondary"}
              size="sm"
              className={`rounded-full flex-shrink-0 w-10 h-10 p-0 ${
                selectedLetter === letter
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </Button>
          ))}
        </div>

        {/* --- Daftar Istilah --- */}
        <div className="space-y-4">
          {Object.keys(groupedTerms).length > 0 ? (
            // Urutkan grup berdasarkan alfabet
            Object.entries(groupedTerms)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, items]) => (
                <div key={letter} className="space-y-3">
                  {/* Header Huruf yang Sticky */}
                  <h3 className="text-lg font-bold text-blue-700 sticky top-[92px] bg-gradient-to-b from-blue-50 via-blue-50 to-transparent py-2 -mx-4 px-4 z-10 backdrop-blur-sm">
                    {letter}
                  </h3>
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      className="border-gray-200 bg-white"
                    >
                      <CardContent className="p-4">
                        <h4 className="font-bold text-gray-900 text-sm">
                          {item.term}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.definition}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))
          ) : (
            // Jika tidak ada hasil
            <Card className="border-gray-200 bg-white">
              <CardContent className="p-6 text-center text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h4 className="font-semibold">Istilah Tidak Ditemukan</h4>
                <p className="text-sm">
                  Coba ganti kata kunci pencarian atau filter alfabet Anda.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}