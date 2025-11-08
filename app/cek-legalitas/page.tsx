"use client";

import {
  User,
  Building,
  ShieldCheck,
  BookCopy,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NotificationButton from "../components/NotificationButton";

// --- Tipe Data untuk Layanan Pengecekan ---
type CheckItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

// --- Dummy Data untuk Layanan ---
const checkData: CheckItem[] = [
  {
    id: "1",
    name: "Cek Legalitas Perusahaan",
    description: "Verifikasi status PT/CV Anda, termasuk data AHU.",
    price: 50000,
    icon: Building,
    href: "/cek-legalitas/perusahaan",
  },
  {
    id: "2",
    name: "Cek Sertifikat Tanah",
    description: "Pengecekan keaslian dan status sertifikat Anda di BPN.",
    price: 150000,
    icon: ShieldCheck,
    href: "/cek-legalitas/tanah",
  },
  {
    id: "3",
    name: "Cek Merek Dagang",
    description: "Periksa ketersediaan nama merek Anda di database DJKI.",
    price: 75000,
    icon: BookCopy,
    href: "/cek-legalitas/merek",
  },
];

export default function CekLegalitasPage() {
  // Format harga
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

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
          <h2 className="text-2xl font-bold text-blue-800">Cek Legalitas</h2>
          <p className="text-sm text-gray-600">
            Pastikan status hukum dokumen dan aset Anda.
          </p>
        </div>

        {/* --- Daftar Layanan Pengecekan --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-800">
            Layanan Tersedia
          </h3>

          {checkData.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.href} className="block">
                <Card className="border-gray-200 bg-white hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4 flex items-center gap-4">
                    {/* Ikon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-700" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-sm font-semibold text-blue-700 mt-2">
                        {formatCurrency(item.price)}
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

        {/* Info Bantuan */}
        <Card className="border-gray-200 bg-blue-50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-blue-800 text-sm">
              Butuh Pengecekan Lain?
            </h4>
            <p className="text-xs text-blue-700 mt-1">
              Hubungi kami melalui fitur{" "}
              <Link
                href="/konsultasi"
                className="font-bold underline"
              >
                Tanya Pengacara
              </Link>{" "}
              untuk kebutuhan pengecekan legalitas kustom.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}