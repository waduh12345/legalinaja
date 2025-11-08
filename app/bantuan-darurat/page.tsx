"use client";

import {
  User,
  AlertTriangle,
  ChevronRight,
  Phone,
  BadgeAlert,
  SearchCheck,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NotificationButton from "../components/NotificationButton";

// --- Tipe Data untuk Panduan Cepat ---
type GuideItem = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

// --- Dummy Data untuk Panduan ---
const guideData: GuideItem[] = [
  {
    id: "1",
    name: "Saya Ditilang Polisi",
    description: "Ketahui hak dan kewajiban Anda saat dihentikan.",
    icon: BadgeAlert,
    href: "/bantuan-darurat/tilang", // (Halaman ini perlu dibuat)
  },
  {
    id: "2",
    name: "Rumah Saya Digerebek/Diggeledah",
    description: "Langkah yang harus diambil saat ada penggeledahan.",
    icon: SearchCheck,
    href: "/bantuan-darurat/penggeledahan", // (Halaman ini perlu dibuat)
  },
  {
    id: "3",
    name: "Saya Ditangkap Polisi",
    description: "Panduan hak-hak Anda saat proses penangkapan.",
    icon: ShieldAlert,
    href: "/bantuan-darurat/penangkapan", // (Halaman ini perlu dibuat)
  },
];

export default function BantuanDaruratPage() {
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
          <h2 className="text-2xl font-bold text-red-600">
            Bantuan Hukum Darurat
          </h2>
          <p className="text-sm text-gray-600">
            Segera dapatkan bantuan atau informasi.
          </p>
        </div>

        {/* --- Peringatan Penting --- */}
        <Card className="border-red-300 bg-red-50">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-red-800 text-sm">
                Penting: Ini Bukan Layanan 110 (Polisi)
              </h4>
              <p className="text-xs text-red-700 mt-1">
                Jika Anda berada dalam bahaya fisik, segera hubungi Polisi di
                110. Layanan ini adalah untuk pendampingan hukum darurat
                profesional.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* --- Tombol Aksi Utama --- */}
        <Button
          asChild
          size="lg"
          className="w-full h-16 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          {/* Arahkan ke /konsultasi dengan filter darurat/24jam */}
          <Link href="/konsultasi?filter=darurat">
            <Phone className="w-5 h-5 mr-3" />
            Hubungi Pengacara (24/7)
          </Link>
        </Button>

        {/* --- Daftar Panduan Cepat --- */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-blue-800">
            Panduan Cepat Saat Darurat
          </h3>

          {guideData.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.href} className="block">
                <Card className="border-gray-200 bg-white hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4 flex items-center gap-4">
                    {/* Ikon */}
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-700" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Indikator Aksi */}
                    <div className="flex-shrink-0">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}