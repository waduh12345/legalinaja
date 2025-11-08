"use client";

import { Search, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchModal from "../components/SearchModal";
import NotificationButton from "../components/NotificationButton";
import { Input } from "@/components/ui/input"; // Impor Input

// Dummy data untuk Mitra Advokat
const lawyerData = [
  {
    id: "1",
    name: "Dr. Budi Santoso, S.H., M.H.",
    avatar: "/LegalApp-logo.png", // Ganti dengan path avatar
    specialty: "Hukum Keluarga",
    experience: 10, // dalam tahun
    rating: 4.9,
    price: 150000, // per 30 menit
    status: "Online",
  },
  {
    id: "2",
    name: "Siti Aminah, S.H.",
    avatar: "/LegalApp-logo.png", // Ganti dengan path avatar
    specialty: "Hukum Bisnis",
    experience: 5,
    rating: 4.8,
    price: 100000,
    status: "Online",
  },
  {
    id: "3",
    name: "Rizky Pratama, S.H.",
    avatar: "/LegalApp-logo.png", // Ganti dengan path avatar
    specialty: "Hukum Properti",
    experience: 7,
    rating: 4.7,
    price: 125000,
    status: "Offline",
  },
  // ... data lainnya
];

// Kategori untuk filter
const categories = [
  "Semua",
  "Keluarga",
  "Bisnis",
  "Properti",
  "Waris",
  "Pidana",
  "Startup",
];

export default function KonsultasiPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Format harga
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Logika filter
  const filteredLawyers = lawyerData
    .filter((lawyer) => {
      // Filter by category
      if (
        selectedCategory !== "Semua" &&
        lawyer.specialty !== selectedCategory
      ) {
        return false;
      }
      // Filter by search term (nama atau spesialisasi)
      if (
        searchTerm &&
        !lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    // Tampilkan yang Online terlebih dahulu
    .sort((a, b) =>
      a.status === b.status ? 0 : a.status === "Online" ? -1 : 1
    );

  return (
    // Tema disesuaikan: bg-gradient-to-br from-blue-50 to-indigo-50
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20">
      {/* Header - Konsisten dengan Home */}
      <header className="sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          {/* Background disesuaikan: bg-white/90 border-gray-200/50 */}
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
          <h2 className="text-2xl font-bold text-blue-800">Tanya Pengacara</h2>
          <p className="text-sm text-gray-600">
            Temukan advokat profesional untuk masalah Anda.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari nama atau spesialisasi..."
            className="pl-10 h-11 text-base border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Filter Kategori */}
        <div className="flex gap-2 pb-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category ? "default" : "secondary"
              }
              className={`rounded-full flex-shrink-0 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Daftar Advokat */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-800">
            Advokat Tersedia ({filteredLawyers.length})
          </h3>

          {filteredLawyers.length > 0 ? (
            filteredLawyers.map((lawyer) => (
              <Card
                key={lawyer.id}
                className="border-gray-200 bg-white hover:shadow-md transition-all duration-200"
              >
                {/* --- PERUBAHAN --- */}
                <CardContent className="p-4 flex items-start gap-4">
                  {/* Kolom 1: Avatar & Status (diberi lebar tetap) */}
                  <div className="relative flex-shrink-0 flex flex-col items-center w-20">
                    <Image
                      src={lawyer.avatar}
                      alt={lawyer.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                      onError={(e) => {
                        // Fallback jika gambar error
                        e.currentTarget.src = `https://placehold.co/64x64/EBF4FF/1D4ED8?text=${lawyer.name
                          .charAt(0)
                          .toUpperCase()}`;
                      }}
                    />
                    <div className="mt-3 w-full flex flex-col items-center">
                      {lawyer.status === "Online" ? (
                        <Button
                          asChild
                          size="sm"
                          // Mengatur padding & font size agar pas
                          className="bg-blue-600 hover:bg-blue-700 w-full flex items-center justify-center gap-1 relative text-xs px-2"
                        >
                          {/* --- PERUBAHAN --- Link diubah */}
                          <Link href={`/konsultasi/reservasi/${lawyer.id}`}>
                            <span
                              // Ukuran dot disesuaikan
                              className="inline-block w-2 h-2 rounded-full bg-green-500 border border-white"
                            ></span>
                            Chat
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled
                          className="bg-gray-200 text-gray-500 w-full text-xs px-2"
                        >
                          Offline
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* --- BARU --- Garis Pemisah Vertikal */}
                  <div className="w-px bg-blue-200 self-stretch"></div>

                  {/* Kolom 2: Info Advokat */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm">
                      {lawyer.name}
                    </h4>
                    <p className="text-xs text-blue-600 font-medium">
                      {lawyer.specialty}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span>{lawyer.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{lawyer.experience} thn</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 mt-2">
                      {formatCurrency(lawyer.price)}
                      <span className="text-xs text-gray-500 font-normal">
                        {" "}
                        / 30 mnt
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Jika tidak ada hasil
            <Card className="border-gray-200 bg-white">
              <CardContent className="p-6 text-center text-gray-500">
                <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h4 className="font-semibold">Tidak Ditemukan</h4>
                <p className="text-sm">
                  Coba ganti kata kunci pencarian atau filter spesialisasi Anda.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Search Modal (tetap ada dari header) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}