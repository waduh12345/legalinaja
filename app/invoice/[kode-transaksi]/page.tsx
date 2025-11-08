"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Clock,
  QrCode,
  CreditCard,
  ClipboardCopy,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Asumsi Anda memiliki komponen Badge

// --- Dummy Data & Tipe (Di-copy dari halaman reservasi) ---
type Lawyer = {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  price: number;
};

const lawyerData: Lawyer[] = [
  {
    id: "1",
    name: "Dr. Budi Santoso, S.H., M.H.",
    avatar: "/LegalApp-logo.png",
    specialty: "Hukum Keluarga",
    price: 150000,
  },
  {
    id: "2",
    name: "Siti Aminah, S.H.",
    avatar: "/LegalApp-logo.png",
    specialty: "Hukum Bisnis",
    price: 100000,
  },
  // ... advokat lainnya
];

type Invoice = {
  id: string;
  lawyer: Lawyer;
  date: string;
  time: string;
  paymentMethod: "qris" | "va";
  status: "Menunggu Pembayaran" | "Lunas" | "Gagal";
  total: number;
  subtotal: number;
  adminFee: number;
  paymentDueDate: string;
  vaNumber?: string;
};

const ADMIN_FEE = 2500;
// --- Akhir Dummy Data ---

export default function InvoicePage() {
  const router = useRouter();
  const params = useParams();
  const kodeTransaksi = params["kode-transaksi"] as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  // 1. Simulasi Ambil Data Invoice
  useEffect(() => {
    if (!kodeTransaksi) return;

    // Simulasi API call
    setLoading(true);
    setTimeout(() => {
      try {
        // Ekstrak lawyerId dari kode transaksi (sesuai format kita: LJ-${id}-${timestamp})
        const parts = kodeTransaksi.split("-");
        const lawyerId = parts[1];
        const foundLawyer = lawyerData.find((l) => l.id === lawyerId);

        if (!foundLawyer) {
          throw new Error("Data advokat untuk invoice ini tidak ditemukan.");
        }

        // Simulasi data yang seharusnya ada di database
        const simulatedInvoice: Invoice = {
          id: kodeTransaksi,
          lawyer: foundLawyer,
          date: new Date(Date.now() + 86400000).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }), // Simulasikan jadwal besok
          time: "14:00 WIB",
          paymentMethod: Math.random() > 0.5 ? "qris" : "va", // Simulasikan metode pembayaran
          status: "Menunggu Pembayaran",
          subtotal: foundLawyer.price,
          adminFee: ADMIN_FEE,
          total: foundLawyer.price + ADMIN_FEE,
          paymentDueDate: new Date(Date.now() + 3600 * 1000).toLocaleString(
            "id-ID",
            { hour: "2-digit", minute: "2-digit" }
          ), // 1 jam dari sekarang
          vaNumber: "88081234567890", // Nomor VA dummy
        };

        setInvoice(simulatedInvoice);
      } catch (err: any) {
        setError(err.message || "Gagal memuat invoice.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, [kodeTransaksi]);

  // 2. Fungsi Helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const copyToClipboard = (text: string, id: string) => {
    // Gunakan execCommand untuk kompatibilitas iframe
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopiedValue(id);
      setTimeout(() => setCopiedValue(null), 2000); // Reset status "Tersalin"
    } catch (err) {
      console.error("Gagal menyalin: ", err);
    }
    document.body.removeChild(textArea);
  };

  // --- Render State ---

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h2>
        <p className="text-gray-600 mb-4">{error || "Invoice tidak ditemukan."}</p>
        <Button asChild>
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    );
  }

  // --- Render Halaman Invoice ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20">
      <main className="max-w-md mx-auto px-4 py-6 space-y-5">
        {/* Header Halaman */}
        <div className="flex items-center gap-2 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-2"
            onClick={() => router.push("/")} // Arahkan ke beranda
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-blue-800 text-center flex-1">
            Detail Invoice
          </h1>
        </div>

        {/* 1. Status & Total Pembayaran */}
        <Card className="border-gray-200 bg-white shadow-lg">
          <CardContent className="p-6 text-center space-y-3">
            <Badge
              variant="outline"
              className="bg-yellow-100 text-yellow-800 border-yellow-300"
            >
              <Clock className="w-3 h-3 mr-1.5" />
              {invoice.status}
            </Badge>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Total Pembayaran</p>
              <p className="text-3xl font-bold text-blue-700">
                {formatCurrency(invoice.total)}
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Batas waktu pembayaran:{" "}
              <span className="font-semibold text-red-600">
                Hari ini, Pukul {invoice.paymentDueDate}
              </span>
            </p>
          </CardContent>
        </Card>

        {/* 2. Instruksi Pembayaran (Kondisional) */}
        {invoice.paymentMethod === "qris" && (
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                Pembayaran QRIS
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3lLyrNm7wUqcGuNR8mv5CJVLMpYzt4B-x7A&s"
                alt="QRIS Code"
                width={256}
                height={256}
                className="w-48 h-48 mx-auto border-4 border-gray-300 p-1 rounded-lg"
              />
              <p className="text-sm text-gray-600">
                Scan kode QR di atas menggunakan aplikasi e-wallet (OVO, GoPay,
                Dana, dll) atau M-Banking Anda.
              </p>
            </CardContent>
          </Card>
        )}

        {invoice.paymentMethod === "va" && (
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Virtual Account (BCA)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Nomor Virtual Account</p>
                <div className="flex gap-2">
                  <p className="text-xl font-bold text-gray-800 flex-1">
                    {invoice.vaNumber}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600"
                    onClick={() =>
                      copyToClipboard(invoice.vaNumber!, "va")
                    }
                  >
                    {copiedValue === "va" ? (
                      <Check className="w-4 h-4 mr-1" />
                    ) : (
                      <ClipboardCopy className="w-4 h-4 mr-1" />
                    )}
                    {copiedValue === "va" ? "Tersalin" : "Salin"}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Selesaikan pembayaran dari ATM, iBanking, atau M-Banking BCA
                Anda.
              </p>
            </CardContent>
          </Card>
        )}

        {/* 3. Rincian Pesanan */}
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Rincian Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Layanan</span>
              <span className="font-medium text-gray-800">
                Konsultasi 30 Menit
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Jadwal</span>
              <span className="font-medium text-gray-800">
                {invoice.date}, {invoice.time}
              </span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between">
              <span className="text-gray-600">Kode Transaksi</span>
              <div className="flex items-center gap-1">
                <span className="font-medium text-gray-800 truncate max-w-[120px]">
                  {invoice.id}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 text-blue-600"
                  onClick={() => copyToClipboard(invoice.id, "kode")}
                >
                  {copiedValue === "kode" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ClipboardCopy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-800">
                {formatCurrency(invoice.subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Biaya Admin</span>
              <span className="font-medium text-gray-800">
                {formatCurrency(invoice.adminFee)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 4. Detail Advokat */}
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-4 flex items-center gap-4">
            <Image
              src={invoice.lawyer.avatar}
              alt={invoice.lawyer.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/64x64/EBF4FF/1D4ED8?text=${invoice.lawyer.name
                  .charAt(0)
                  .toUpperCase()}`;
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Konsultasi dengan</p>
              <h4 className="font-bold text-gray-900 text-sm truncate">
                {invoice.lawyer.name}
              </h4>
              <p className="text-xs text-blue-600 font-medium">
                {invoice.lawyer.specialty}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tombol Selesai */}
        <Button
          size="lg"
          className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
          onClick={() => router.push("/")}
        >
          Selesai
        </Button>
      </main>
    </div>
  );
}