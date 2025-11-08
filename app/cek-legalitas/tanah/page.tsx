"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Impor Input
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Loader2,
  CreditCard,
  QrCode,
  AlertCircle,
  ShieldCheck, // Mengganti Building dengan ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Tipe Data & Dummy Data (diambil dari app/cek-legalitas/page.tsx) ---
type CheckItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

// --- Data Diubah untuk Cek Sertifikat Tanah (ID "2") ---
const serviceData: CheckItem = {
  id: "2",
  name: "Cek Sertifikat Tanah",
  description: "Pengecekan keaslian dan status sertifikat Anda di BPN.",
  price: 150000,
  icon: ShieldCheck,
  href: "/cek-legalitas/tanah",
};
// --- Akhir Dummy Data ---

// Biaya admin
const ADMIN_FEE = 2500;

export default function CekTanahPage() {
  const router = useRouter();

  // --- State Diubah ---
  const [nomorSertifikat, setNomorSertifikat] = useState(""); // <-- Input Baru
  const [lokasiTanah, setLokasiTanah] = useState(""); // <-- Input Baru
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Format harga
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // --- Handle submit Diubah ---
  const handleSubmit = () => {
    // Validasi input
    if (!nomorSertifikat) {
      setError("Nomor sertifikat tidak boleh kosong.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Simulasi pembuatan transaksi
    console.log("Membuat pesanan Cek Legalitas untuk:", {
      serviceId: serviceData.id,
      nomorSertifikat: nomorSertifikat,
      lokasiTanah: lokasiTanah,
      paymentMethod,
    });

    // Buat kode transaksi unik
    const kodeTransaksi = `LJ-CEK-${serviceData.id}-${Date.now()}`;

    // Simulasi delay API
    setTimeout(() => {
      setIsSubmitting(false);
      // Pindah ke halaman invoice
      router.push(`/invoice/${kodeTransaksi}`);
    }, 1500);
  };

  // Kalkulasi harga
  const subtotal = serviceData.price;
  const totalPrice = subtotal + ADMIN_FEE;
  const Icon = serviceData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20">
      <main className="max-w-md mx-auto px-4 py-6 space-y-5">
        {/* Header Halaman */}
        <div className="flex items-center gap-2 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-blue-800 text-center flex-1">
            Detail Pengecekan
          </h1>
        </div>

        {/* 1. Info Jasa */}
        <Card className="border-gray-200 bg-white">
          <CardContent className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon className="w-8 h-8 text-blue-700" />
            </div>
            <div className="flex-1 min-w-0">
              <Badge
                variant="secondary"
                className="text-xs bg-indigo-100 text-indigo-700 mb-1"
              >
                Layanan Cek
              </Badge>
              <h4 className="font-bold text-gray-900 text-base">
                {serviceData.name}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {serviceData.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 2. Form Input Data (Diubah) */}
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Data Sertifikat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Input Nomor Sertifikat */}
            <div>
              <Label
                htmlFor="nomorSertifikat"
                className="font-semibold text-gray-700 mb-2 text-sm"
              >
                Nomor Sertifikat (Wajib)
              </Label>
              <Input
                id="nomorSertifikat"
                placeholder="Contoh: 10.15.01.01.1.00001"
                value={nomorSertifikat}
                onChange={(e) => setNomorSertifikat(e.target.value)}
                className="h-11 bg-blue-50 border-blue-200"
              />
            </div>

            {/* Input Keterangan */}
            <div>
              <Label
                htmlFor="lokasiTanah"
                className="font-semibold text-gray-700 mb-2 text-sm"
              >
                Lokasi & Keterangan (Opsional)
              </Label>
              <Textarea
                id="lokasiTanah"
                placeholder="Berikan info lokasi tanah (Kota/Kecamatan) atau info lain yang relevan."
                value={lokasiTanah}
                onChange={(e) => setLokasiTanah(e.target.value)}
                className="h-24 bg-blue-50 border-blue-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* 3. Detail Pembayaran */}
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Rincian Pembayaran
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Rincian Biaya */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal Layanan</span>
                <span className="font-medium text-gray-800">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Biaya Admin</span>
                <span className="font-medium text-gray-800">
                  {formatCurrency(ADMIN_FEE)}
                </span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between font-bold text-base">
                <span className="text-gray-900">Total Pembayaran</span>
                <span className="text-blue-700">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>

            {/* Pilihan Metode Pembayaran */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                Metode Pembayaran
              </h4>
              <RadioGroup
                defaultValue="qris"
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-2"
              >
                {/* Opsi QRIS */}
                <Label
                  htmlFor="qris"
                  className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-blue-700" />
                    <span className="font-medium text-gray-800">QRIS</span>
                  </div>
                  <RadioGroupItem value="qris" id="qris" />
                </Label>
                {/* Opsi Virtual Account */}
                <Label
                  htmlFor="va"
                  className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-700" />
                    <span className="font-medium text-gray-800">
                      Virtual Account
                    </span>
                  </div>
                  <RadioGroupItem value="va" id="va" />
                </Label>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        {/* Tombol Submit (Diubah) */}
        <Button
          size="lg"
          className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={isSubmitting || !nomorSertifikat}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            `Bayar & Cek Legalitas (${formatCurrency(totalPrice)})`
          )}
        </Button>
      </main>
    </div>
  );
}