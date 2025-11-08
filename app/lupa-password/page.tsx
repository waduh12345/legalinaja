"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, MailCheck } from "lucide-react"; // Impor MailCheck

export default function LupaPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error

    // Validasi sederhana
    if (!email) {
      setError("Email tidak boleh kosong.");
      return;
    }

    // TODO: Tambahkan logika pengiriman link reset password ke backend
    console.log("Forgot Password attempt:", { email });

    // Tampilkan pesan sukses setelah submit
    setIsSubmitted(true);
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
            Lupa Password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Jangan khawatir, kami akan kirimkan link untuk reset password Anda.
          </p>
        </div>

        {/* 4. Form atau Pesan Sukses (Render Bersyarat) */}
        <Card className="bg-white shadow-xl rounded-2xl border-gray-200/50">
          <CardContent className="p-6 sm:p-8">
            {!isSubmitted ? (
              // --- FORM ---
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Input Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Alamat Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="anda@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 text-base"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-xs text-red-600">{error}</p>
                )}

                {/* 5. Tombol CTA */}
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-11 text-base"
                  >
                    Kirim Link Reset
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            ) : (
              // --- PESAN SUKSES ---
              <div className="text-center space-y-4">
                <MailCheck className="w-16 h-16 text-green-600 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Link Terkirim!
                </h3>
                <p className="text-sm text-gray-600">
                  Kami telah mengirimkan link reset password ke 
                  <span className="font-bold text-gray-800"> {email}</span>.
                </p>
                <p className="text-xs text-gray-500">
                  Silakan periksa inbox (dan folder spam) Anda.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 6. Link CTA Sekunder */}
        <p className="text-center text-sm text-gray-600">
          Ingat password Anda?{" "}
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