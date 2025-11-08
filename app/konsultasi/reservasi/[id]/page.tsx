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
import {
  Star,
  ArrowLeft,
  Loader2,
  CreditCard,
  QrCode,
  AlertCircle,
} from "lucide-react";

// --- Dummy Data & Tipe ---
// (Anda akan mengganti ini dengan API call sungguhan)
type Lawyer = {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  experience: number;
  rating: number;
  price: number;
  status: "Online" | "Offline";
};

const lawyerData: Lawyer[] = [
  {
    id: "1",
    name: "Dr. Budi Santoso, S.H., M.H.",
    avatar: "/LegalApp-logo.png",
    specialty: "Hukum Keluarga",
    experience: 10,
    rating: 4.9,
    price: 150000,
    status: "Online",
  },
  {
    id: "2",
    name: "Siti Aminah, S.H.",
    avatar: "/LegalApp-logo.png",
    specialty: "Hukum Bisnis",
    experience: 5,
    rating: 4.8,
    price: 100000,
    status: "Online",
  },
  // ... advokat lainnya
];
// --- Akhir Dummy Data ---

// Slot jam dummy
const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

// Biaya admin
const ADMIN_FEE = 2500;

export default function ReservationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Ambil data advokat (simulasi)
  useEffect(() => {
    // Simulasi fetch data
    const foundLawyer = lawyerData.find((l) => l.id === id);
    if (foundLawyer) {
      setLawyer(foundLawyer);
    } else {
      setError("Advokat tidak ditemukan.");
    }
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
    if (!selectedDate || !selectedTime) {
      setError("Silakan pilih tanggal dan jam reservasi.");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulasi pembuatan transaksi
    console.log("Membuat reservasi untuk:", {
      lawyerId: lawyer?.id,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      paymentMethod,
    });

    // Buat kode transaksi unik
    const kodeTransaksi = `LJ-${lawyer?.id}-${Date.now()}`;

    // Simulasi delay API
    setTimeout(() => {
      setIsLoading(false);
      // 3. Pindah ke halaman invoice
      router.push(`/invoice/${kodeTransaksi}`);
    }, 1500);
  };

  // Tampilkan loading jika data advokat belum ada
  if (!lawyer && !error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
      </div>
    );
  }

  // Tampilkan error jika advokat tidak ditemukan
  if (error && !lawyer) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button asChild>
          <Link href="/konsultasi">Kembali</Link>
        </Button>
      </div>
    );
  }

  // Kalkulasi harga
  const subtotal = lawyer?.price || 0;
  const totalPrice = subtotal + ADMIN_FEE;

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
            Konfirmasi Reservasi
          </h1>
        </div>

        {/* 1. Info Advokat */}
        {lawyer && (
          <Card className="border-gray-200 bg-white">
            <CardContent className="p-4 flex items-center gap-4">
              <Image
                src={lawyer.avatar}
                alt={lawyer.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/64x64/EBF4FF/1D4ED8?text=${lawyer.name
                    .charAt(0)
                    .toUpperCase()}`;
                }}
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm truncate">
                  {lawyer.name}
                </h4>
                <p className="text-xs text-blue-600 font-medium">
                  {lawyer.specialty}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span>{lawyer.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{lawyer.experience} thn</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 2. Pilih Jadwal */}
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Pilih Jadwal Konsultasi
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

            {/* Pilihan Jam */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 text-sm">
                Pilih Jam (WIB)
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "secondary"}
                    className={`w-full ${
                      selectedTime === time
                        ? "bg-blue-600 text-white"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
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
                <span className="text-gray-600">Subtotal (30 Menit)</span>
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

        {/* Tombol Submit */}
        <Button
          size="lg"
          className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={isLoading || !selectedTime || !selectedDate}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            `Bayar & Reservasi (${formatCurrency(totalPrice)})`
          )}
        </Button>
      </main>
    </div>
  );
}