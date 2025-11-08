"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar"; // Asumsi dari shadcn/ui
import { Label } from "@/components/ui/label"; // Asumsi dari shadcn/ui
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Asumsi dari shadcn/ui
import { Textarea } from "@/components/ui/textarea"; // Asumsi Anda memiliki komponen Textarea
import {
  ArrowLeft,
  Loader2,
  CreditCard,
  QrCode,
  AlertCircle,
  FileSignature,
  Building,
  Users,
  BookCopy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Asumsi Anda memiliki komponen Badge

// --- Tipe Data & Dummy Data (dari app/reservasi/page.tsx) ---
type ServiceItem = {
  id: string;
  name: string;
  professional: "Notaris" | "PPAT" | "Konsultan HAKI";
  category: "Properti" | "Perusahaan" | "Keluarga" | "HAKI";
  excerpt: string; // Akan digunakan sebagai deskripsi
  price: number; // Harga "mulai dari"
  icon: React.ComponentType<{ className?: string }>;
};

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
  // ... data lainnya
];
// --- Akhir Dummy Data ---

// Biaya admin
const ADMIN_FEE = 2500;

export default function DetailReservasiJasaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [service, setService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [keterangan, setKeterangan] = useState(""); // <-- Input Keterangan Baru
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // 1. Ambil data Jasa (simulasi)
  useEffect(() => {
    setIsFetching(true);
    // Simulasi fetch data
    const foundService = serviceData.find((s) => s.id === id);
    if (foundService) {
      setService(foundService);
    } else {
      setError("Jasa tidak ditemukan.");
    }
    setIsFetching(false);
  }, [id]);

  // Format harga
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // 2. Handle submit reservasi
  const handleSubmit = () => {
    if (!selectedDate) {
      setError("Silakan pilih tanggal reservasi.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Simulasi pembuatan transaksi
    console.log("Membuat reservasi Jasa untuk:", {
      serviceId: service?.id,
      date: selectedDate.toISOString().split("T")[0],
      keterangan: keterangan,
      paymentMethod,
    });

    // Buat kode transaksi unik
    const kodeTransaksi = `LJ-SRV-${service?.id}-${Date.now()}`;

    // Simulasi delay API
    setTimeout(() => {
      setIsSubmitting(false);
      // 3. Pindah ke halaman invoice
      router.push(`/invoice/${kodeTransaksi}`);
    }, 1500);
  };

  // Tampilkan loading jika data jasa belum ada
  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
      </div>
    );
  }

  // Tampilkan error jika jasa tidak ditemukan
  if (error || !service) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Terjadi Kesalahan
        </h2>
        <p className="text-gray-600 mb-4">{error || "Jasa tidak ditemukan."}</p>
        <Button asChild>
          <Link href="/reservasi">Kembali</Link>
        </Button>
      </div>
    );
  }

  // Kalkulasi harga
  const subtotal = service.price;
  const totalPrice = subtotal + ADMIN_FEE;
  const Icon = service.icon;

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
            Detail Reservasi Jasa
          </h1>
        </div>

        {/* 1. Info Jasa (Diubah) */}
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon className="w-8 h-8 text-blue-700" />
            </div>
            <div className="flex-1 min-w-0">
              <Badge
                variant="secondary"
                className="text-xs bg-indigo-100 text-indigo-700 mb-1"
              >
                {service.category}
              </Badge>
              <h4 className="font-bold text-gray-900 text-base">
                {service.name}
              </h4>
              <p className="text-xs text-gray-600 mt-1">{service.excerpt}</p>
              <p className="text-xs font-semibold text-green-700 mt-1">
                Oleh: {service.professional}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 2. Detail Jadwal & Keterangan (Diubah) */}
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Detail Layanan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Kalender */}
            <div className="">
              <input
                type="date"
                className="px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full rounded-md bg-blue-50 text-blue-700 border border-blue-200"
                value={
                  selectedDate
                    ? selectedDate.toISOString().split("T")[0]
                    : ""
                }
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  setSelectedDate(date);
                }}
              />
            </div>

            {/* Keterangan (Baru) */}
            <div>
              <Label
                htmlFor="keterangan"
                className="font-semibold text-gray-700 mb-2 text-sm"
              >
                Keterangan (Opsional)
              </Label>
              <Textarea
                id="keterangan"
                placeholder="Berikan info tambahan untuk profesional kami. Contoh: Mohon hubungi saya di 0812... untuk koordinasi dokumen."
                value={keterangan}
                onChange={(e: any) => setKeterangan(e.target.value)}
                className="h-24 bg-blue-50 border-blue-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* 3. Detail Pembayaran (Disesuaikan) */}
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
                <span className="text-gray-600">
                  Subtotal (Mulai dari)
                </span>
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

            {/* Pilihan Metode Pembayaran (Tetap) */}
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
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        {/* Tombol Submit */}
        <Button
          size="lg"
          className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedDate}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            `Pesan Layanan (${formatCurrency(totalPrice)})`
          )}
        </Button>
      </main>
    </div>
  );
}