"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MailWarning, Loader2, CheckCircle2 } from "lucide-react"; // Ikon baru
import { useSearchParams } from "next/navigation";

// Kita bungkus komponen utama yang menggunakan useSearchParams
// dengan <Suspense> agar bekerja dengan baik.
function VerifikasiEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "email Anda";

  const [isLoading, setIsLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResendMessage("");
    setIsLoading(true);

    // TODO: Tambahkan logika pengiriman ulang email verifikasi ke backend
    console.log("Resend verification email attempt:", { email });

    // Simulasi API call
    setTimeout(() => {
      setIsLoading(false);
      setResendMessage("Link verifikasi baru telah dikirim!");
    }, 1500);
  };

  return (
    // 1. Latar belakang gradien yang konsisten & layout 'min-h-screen'
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col justify-center items-center px-4 py-12">
      {/* 2. Kontainer form dengan lebar maksimum (Mobile-first) */}
      <div className="max-w-sm w-full space-y-8">
        {/* 3. Header: Logo & Judul (Hierarki Visual Jelas) */}
        <div className="text-center">
          <Image
            src="/logo-legal-app.webp"
            alt="LegalAja Logo"
            width={64}
            height={64}
            className="mx-auto h-16 w-16 object-contain"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Verifikasi Email Anda
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Satu langkah terakhir untuk mengamankan akun Anda.
          </p>
        </div>

        {/* 4. Konten Utama */}
        <Card className="bg-white shadow-xl rounded-2xl border-gray-200/50">
          <CardContent className="p-6 sm:p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="text-center space-y-4">
                <MailWarning className="w-16 h-16 text-yellow-500 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Periksa Inbox Anda
                </h3>
                <p className="text-sm text-gray-600">
                  Kami telah mengirimkan link verifikasi ke
                  <span className="font-bold text-gray-800"> {email}</span>.
                </p>
                <p className="text-xs text-gray-500">
                  Belum menerima? Silakan cek folder spam Anda atau kirim ulang.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-xs text-red-600 text-center">{error}</p>
              )}

              {/* Pesan Sukses Kirim Ulang */}
              {resendMessage && (
                <div className="flex items-center justify-center gap-2 text-xs text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{resendMessage}</span>
                </div>
              )}

              {/* 5. Tombol CTA */}
              <div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-11 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    "Kirim Ulang Email"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 6. Link CTA Sekunder */}
        <p className="text-center text-sm text-gray-600">
          Sudah verifikasi?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Kembali ke Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// Bungkus komponen utama dengan Suspense
export default function VerifikasiEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <VerifikasiEmailContent />
    </Suspense>
  );
}