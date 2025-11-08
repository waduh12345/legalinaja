"use client";

import {
  User,
  AlertTriangle,
  ArrowLeft,
  Phone,
  CheckCircle,
  XCircle,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotificationButton from "../../components/NotificationButton"; // Path disesuaikan

// Komponen helper untuk poin-poin
const InfoPoint = ({
  text,
  valid = true,
}: {
  text: string;
  valid?: boolean;
}) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0">
      {valid ? (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ) : (
        <XCircle className="w-5 h-5 text-red-600" />
      )}
    </div>
    <p className="text-sm text-gray-700">{text}</p>
  </div>
);

export default function PenangkapanPage() {
  const router = useRouter();

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

      <main className="max-w-md mx-auto px-4 py-6 space-y-5">
        {/* Header Halaman */}
        <div className="flex items-center gap-2 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-2"
            onClick={() => router.back()} // Kembali ke halaman /darurat
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-blue-800 text-center flex-1">
            Panduan Saat Ditangkap
          </h1>
        </div>

        {/* --- Peringatan Paling Penting --- */}
        <Card className="border-red-500 bg-red-100 shadow-xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex-shrink-0">
              <ShieldAlert className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-red-800 text-base">
                PERINGATAN KERAS
              </h4>
              <p className="text-sm text-red-700 mt-1 font-medium">
                JANGAN TANDATANGANI BAP (Berita Acara Pemeriksaan) atau surat
                apapun tanpa didampingi pengacara Anda.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* --- Langkah Utama --- */}
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Langkah yang HARUS Dilakukan (Do's)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoPoint text="Tetap Tenang. Jangan panik atau melawan secara fisik. Sikap kooperatif (tapi waspada) adalah yang terbaik." />
            <InfoPoint text="Tanyakan Identitas dan Surat Perintah Penangkapan yang sah (kecuali tertangkap tangan)." />
            <InfoPoint text="Gunakan Hak Anda Untuk Diam. Anda tidak wajib menjawab pertanyaan terkait inti perkara tanpa pengacara." />
            <InfoPoint text="Segera Minta Dihubungi Pengacara. Sebutkan bahwa Anda ingin didampingi pengacara dari LegalAja atau pengacara pribadi Anda." />
            <InfoPoint text="Minta Hak Menghubungi Keluarga untuk memberitahu kondisi dan lokasi Anda." />
          </CardContent>
        </Card>

        {/* --- Larangan --- */}
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-red-700">
              Hal yang JANGAN Dilakukan (Don'ts)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoPoint
              text="Melawan Petugas Secara Fisik. Ini dapat menambah tuntutan pidana baru."
              valid={false}
            />
            <InfoPoint
              text="Memberikan Keterangan Berbelit-belit atau Berbohong. Lebih baik diam."
              valid={false}
            />
            <InfoPoint
              text="Menandatangani Dokumen Apapun tanpa membaca dan tanpa didampingi pengacara."
              valid={false}
            />
            <InfoPoint
              text="Percaya Janji 'Bebas' Jika Mengaku. Jangan mengambil keputusan apapun tanpa nasihat hukum."
              valid={false}
            />
          </CardContent>
        </Card>

        {/* --- Tombol Aksi Utama --- */}
        <div className="pt-4">
          <p className="text-center text-sm text-gray-600 mb-2">
            Segera butuh pendampingan?
          </p>
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
        </div>
      </main>
    </div>
  );
}