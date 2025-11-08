"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, ArrowRight, User, Phone } from "lucide-react";
import TermsModal from "@/components/TermsModal"; // Impor modal baru

export default function RegisterPage() {
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error

    // Validasi sederhana
    if (password !== konfirmasiPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    if (!termsAccepted) {
      setError("Anda harus menyetujui Syarat & Ketentuan.");
      return;
    }

    // TODO: Tambahkan logika registrasi di sini
    console.log("Register attempt:", {
      nama,
      noHp,
      email,
      password,
      termsAccepted,
    });
  };

  return (
    <>
      {/* 1. Latar belakang gradien yang konsisten & layout 'min-h-screen' */}
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
              Buat Akun Baru
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Daftar untuk mulai menggunakan LegalAja
            </p>
          </div>

          {/* 4. Form: Layout Intuitif dalam 'Card' yang bersih */}
          <Card className="bg-white shadow-xl rounded-2xl border-gray-200/50">
            <CardContent className="p-6 sm:p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Input Nama Lengkap */}
                <div className="space-y-2">
                  <Label htmlFor="nama" className="text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </Label>
                  <div className="relative">
                    <Input
                      id="nama"
                      name="nama"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Nama Anda"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="pl-10 h-11 text-base"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Input Nomer HP */}
                <div className="space-y-2">
                  <Label htmlFor="noHp" className="text-sm font-medium text-gray-700">
                    Nomer HP
                  </Label>
                  <div className="relative">
                    <Input
                      id="noHp"
                      name="noHp"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="08123456789"
                      value={noHp}
                      onChange={(e) => setNoHp(e.target.value)}
                      className="pl-10 h-11 text-base"
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

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

                {/* Input Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11 text-base"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Input Konfirmasi Password */}
                <div className="space-y-2">
                  <Label htmlFor="konfirmasiPassword" className="text-sm font-medium text-gray-700">
                    Konfirmasi Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="konfirmasiPassword"
                      name="konfirmasiPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                      value={konfirmasiPassword}
                      onChange={(e) => setKonfirmasiPassword(e.target.value)}
                      className="pl-10 h-11 text-base"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Checkbox Syarat & Ketentuan */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) =>
                      setTermsAccepted(checked as boolean)
                    }
                    className="mt-0.5"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium text-gray-600"
                    >
                      Saya setuju dengan{" "}
                      <span
                        onClick={() => setIsModalOpen(true)}
                        className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer underline"
                      >
                        Syarat & Ketentuan
                      </span>
                    </Label>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-xs text-red-600">{error}</p>
                )}

                {/* 5. Tombol CTA (Palet Warna Seimbang) */}
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-11 text-base"
                  >
                    Daftar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* 6. Link CTA Sekunder */}
          <p className="text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>

      {/* 7. Modal Syarat & Ketentuan */}
      <TermsModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}