"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  Loader2,
  CreditCard,
  QrCode,
  AlertCircle,
  FileText,
  FileCheck,
  BadgeCent,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Tipe Data & Dummy Data (di-copy dari /dokumen) ---
type DocumentItem = {
  id: string;
  name: string;
  type: "Template" | "Jasa";
  category: "Properti" | "Bisnis" | "Startup" | "Ketenagakerjaan" | "Pribadi";
  excerpt: string; // Akan kita anggap sebagai deskripsi lengkap di halaman ini
  price: number;
  icon: React.ComponentType<{ className?: string }>;
};

const documentData: DocumentItem[] = [
  {
    id: "1",
    name: "Template Perjanjian Sewa",
    type: "Template",
    category: "Properti",
    excerpt: "Surat perjanjian sewa-menyewa rumah/apartemen yang lengkap mencakup hak dan kewajiban kedua belah pihak.",
    price: 75000,
    icon: FileText,
  },
  {
    id: "2",
    name: "Jasa Review Kontrak",
    type: "Jasa",
    category: "Bisnis",
    excerpt: "Dapatkan review mendalam atas kontrak bisnis Anda oleh profesional hukum terverifikasi untuk memitigasi risiko.",
    price: 250000,
    icon: FileCheck,
  },
  // ... data lainnya
];
// --- Akhir Dummy Data ---

// Biaya admin
const ADMIN_FEE = 2500;

export default function DocumentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [item, setItem] = useState<DocumentItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [isLoading, setIsLoading] = useState(true); // Loading true di awal
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading untuk submit
  const [error, setError] = useState("");

  // 1. Ambil data dokumen (simulasi)
  useEffect(() => {
    // Simulasi fetch data
    setTimeout(() => {
      const foundItem = documentData.find((l) => l.id === id);
      if (foundItem) {
        setItem(foundItem);
      } else {
        setError("Dokumen atau Jasa tidak ditemukan.");
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  // Format harga
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // 2. Handle submit pembelian
  const handleSubmit = () => {
    if (!item) return;

    setError("");
    setIsSubmitting(true);

    // Simulasi pembuatan transaksi
    console.log("Membuat pesanan dokumen untuk:", {
      itemId: item.id,
      itemName: item.name,
      paymentMethod,
    });

    // Buat kode transaksi unik (format berbeda untuk invoice)
    const kodeTransaksi = `LJ-DOC-${item.id}-${Date.now()}`;

    // Simulasi delay API
    setTimeout(() => {
      setIsSubmitting(false);
      // 3. Pindah ke halaman invoice
      router.push(`/invoice/${kodeTransaksi}`);
    }, 1500);
  };

  // Tampilkan loading jika data belum ada
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
      </div>
    );
  }

  // Tampilkan error jika item tidak ditemukan
  if (error || !item) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h2>
        <p className="text-gray-600 mb-4">{error || "Item tidak ditemukan."}</p>
        <Button asChild>
          <Link href="/toko-dokumen">Kembali ke Toko Dokumen</Link>
        </Button>
      </div>
    );
  }

  // Kalkulasi harga
  const subtotal = item.price;
  const totalPrice = subtotal + ADMIN_FEE;
  const Icon = item.icon;

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
            Detail Pesanan
          </h1>
        </div>

        {/* 1. Info Dokumen/Jasa */}
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
                {item.category}
              </Badge>
              <h4 className="font-bold text-gray-900 text-base">
                {item.name}
              </h4>
              <p className="text-xs text-gray-600 mt-1">{item.excerpt}</p>
            </div>
          </CardContent>
        </Card>

        {/* 2. Rincian Pembayaran */}
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
                <span className="text-gray-600">Subtotal ({item.type})</span>
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

        {/* Tombol Submit */}
        <Button
          size="lg"
          className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            `Bayar (${formatCurrency(totalPrice)})`
          )}
        </Button>
      </main>
    </div>
  );
}