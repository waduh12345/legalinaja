"use client";

import {
  Search,
  User,
  FileSignature, // Ikon baru
  Building, // Ikon baru
  Users, // Ikon baru
  BookCopy, // Ikon baru
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchModal from "../components/SearchModal";
import NotificationButton from "../components/NotificationButton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// --- Tipe Data Baru untuk Jasa Reservasi ---
type ServiceItem = {
  id: string;
  name: string;
  professional: "Notaris" | "PPAT" | "Konsultan HAKI";
  category: "Properti" | "Perusahaan" | "Keluarga" | "HAKI";
  excerpt: string;
  price: number; // Harga "mulai dari"
  icon: React.ComponentType<{ className?: string }>;
};

// --- Dummy Data untuk Jasa Reservasi ---
const serviceData: ServiceItem[] = [
  {
    id: "1",
    name: "Jasa Akta Jual Beli (AJB)",
    professional: "PPAT",
    category: "Properti",
    excerpt: "Pengurusan akta otentik untuk jual beli tanah & bangunan.",
    price: 2500000,
    icon: FileSignature,
  },
  {
    id: "2",
    name: "Jasa Pendirian PT",
    professional: "Notaris",
    category: "Perusahaan",
    excerpt: "Paket lengkap pendirian Perseroan Terbatas (PT) baru.",
    price: 1500000,
    icon: Building,
  },
  {
    id: "3",
    name: "Jasa Akta Waris",
    professional: "Notaris",
    category: "Keluarga",
    excerpt: "Pembuatan Surat Keterangan Hak Waris (SKHW).",
    price: 1000000,
    icon: Users,
  },
  {
    id: "4",
    name: "Jasa Pendaftaran Merek",
    professional: "Konsultan HAKI",
    category: "HAKI",
    excerpt: "Pendaftaran merek dagang Anda ke DJKI.",
    price: 800000,
    icon: BookCopy,
  },
];

// Kategori untuk filter
const categories = [
  "Semua",
  "Properti",
  "Perusahaan",
  "Keluarga",
  "HAKI",
];

export default function ReservasiJasaPage() {
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

  // --- Logika Filter Diperbarui ---
  const filteredServices = serviceData
    .filter((service) => {
      // Filter by category
      if (
        selectedCategory !== "Semua" &&
        service.category !== selectedCategory
      ) {
        return false;
      }
      // Filter by search term (nama, kategori, atau profesional)
      if (
        searchTerm &&
        !service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !service.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !service.professional.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

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
        {/* Judul Halaman Diubah */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-800">Reservasi Jasa</h2>
          <p className="text-sm text-gray-600">
            Booking Notaris, PPAT, atau Konsultan HAKI.
          </p>
        </div>

        {/* Search Bar Diubah */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari jasa (misal: 'AJB', 'Pendirian PT')..."
            className="pl-10 h-11 text-base border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Filter Kategori Diubah */}
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

        {/* --- Daftar Jasa (Menggunakan layout vertical card) --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-800">
            Layanan Tersedia ({filteredServices.length})
          </h3>

          {filteredServices.length > 0 ? (
            filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  className="border-gray-200 bg-white hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-4 flex flex-col gap-3">
                    {/* Ikon di atas, landscape */}
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-blue-700" />
                      </div>
                    </div>
                    {/* Info & Tombol di bawah */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        {/* Kategori Badge */}
                        <Badge
                          variant="secondary"
                          className="text-xs bg-indigo-100 text-indigo-700"
                        >
                          {service.category}
                        </Badge>
                        {/* Tipe Profesional Badge */}
                        <Badge
                          variant="secondary"
                          className="text-xs bg-green-100 text-green-700"
                        >
                          {service.professional}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mt-2 truncate">
                        {service.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {service.excerpt}
                      </p>
                      {/* Harga & Tombol Aksi */}
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-sm font-semibold text-blue-700">
                          <span className="text-xs text-gray-500 font-normal">
                            Mulai dari{" "}
                          </span>
                          {formatCurrency(service.price)}
                        </p>
                        <Button
                          asChild
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 h-auto"
                        >
                          {/* Link ke halaman detail reservasi (perlu dibuat) */}
                          <Link href={`/reservasi-jasa/${service.id}`}>
                            Reservasi
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            // Jika tidak ada hasil
            <Card className="border-gray-200 bg-white">
              <CardContent className="p-6 text-center text-gray-500">
                <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h4 className="font-semibold">Layanan Tidak Ditemukan</h4>
                <p className="text-sm">
                  Coba ganti kata kunci pencarian atau filter kategori Anda.
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