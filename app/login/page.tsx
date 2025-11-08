"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Tambahkan logika autentikasi di sini
    console.log("Login attempt:", { email, password });
  };

  return (
    // 1. Latar belakang gradien yang konsisten & layout 'min-h-screen'
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col justify-center items-center px-4">
      
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
            Selamat Datang Kembali
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Masuk ke akun LegalAja Anda
          </p>
        </div>

        {/* 4. Form: Layout Intuitif dalam 'Card' yang bersih */}
        <Card className="bg-white shadow-xl rounded-2xl border-gray-200/50">
          <CardContent className="p-6 sm:p-8">
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
                    className="pl-10 h-11 text-base" // Padding untuk ikon
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Link
                    href="/lupa-password"
                    className="text-xs font-medium text-blue-600 hover:text-blue-500"
                  >
                    Lupa password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 text-base" // Padding untuk ikon
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* 5. Tombol CTA (Palet Warna Seimbang) */}
              <div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-11 text-base"
                >
                  Masuk
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 6. Link CTA Sekunder */}
        <p className="text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}