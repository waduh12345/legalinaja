"use client";

import {
  User,
  AlertTriangle,
  ArrowLeft,
  Phone,
  Mail,
  Lock,
  Receipt,
  LogOut,
  UserCheck,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Impor Tabs
import { Badge } from "@/components/ui/badge"; // Impor Badge
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NotificationButton from "../components/NotificationButton";

// --- Dummy Data ---
const userData = {
  name: "Budi Gunawan",
  email: "budi.g@mail.com",
  phone: "081234567890",
  avatar: "/LegalApp-logo.png", // Ganti dengan avatar user
};

const transactionData = [
  {
    id: "1",
    name: "Cek Legalitas Perusahaan",
    date: "08 Nov 2025",
    price: 52500,
    status: "Lunas",
  },
  {
    id: "2",
    name: "Konsultasi (Dr. Budi S.)",
    date: "05 Nov 2025",
    price: 152500,
    status: "Lunas",
  },
  {
    id: "3",
    name: "Template Perjanjian Sewa",
    date: "01 Nov 2025",
    price: 77500,
    status: "Lunas",
  },
  {
    id: "4",
    name: "Jasa Pendirian PT",
    date: "28 Okt 2025",
    price: 1502500,
    status: "Gagal",
  },
];
// --- Akhir Dummy Data ---

export default function ProfilePage() {
  const router = useRouter();
  const [password, setPassword] = useState({ old: "", new: "", confirm: "" });
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [isPassLoading, setIsPassLoading] = useState(false);

  // Format harga
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Handle Ubah Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess("");
    setIsPassLoading(true);

    if (password.new !== password.confirm) {
      setPassError("Password baru dan konfirmasi tidak cocok.");
      setIsPassLoading(false);
      return;
    }
    if (password.new.length < 8) {
      setPassError("Password baru minimal harus 8 karakter.");
      setIsPassLoading(false);
      return;
    }

    // Simulasi API Call
    console.log("Mengubah password...", password);
    setTimeout(() => {
      setIsPassLoading(false);
      setPassSuccess("Password berhasil diperbarui!");
      setPassword({ old: "", new: "", confirm: "" });
    }, 1500);
  };

  // Handle Logout
  const handleLogout = () => {
    console.log("User logging out...");
    // TODO: Tambahkan logika clear auth token/session
    router.push("/login"); // Arahkan ke halaman login
  };

  return (
    // Tema disesuaikan: bg-gradient-to-br from-blue-50 to-indigo-50
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20">
      {/* Header - Konsisten */}
      <header className="sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-2"
                  onClick={() => router.back()} // Tombol kembali
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-lg font-bold text-blue-700">Profil Saya</h1>
              </div>
              <div className="flex items-center gap-2">
                <NotificationButton />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 1. Card Header Profil */}
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-4 flex items-center gap-4">
            <Image
              src={userData.avatar}
              alt={userData.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/64x64/EBF4FF/1D4ED8?text=${userData.name
                  .charAt(0)
                  .toUpperCase()}`;
              }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-lg truncate">
                {userData.name}
              </h4>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* 2. Tabs */}
        <Tabs defaultValue="pribadi" className="w-full">
          {/* Tab Triggers */}
          <TabsList className="grid w-full grid-cols-3 bg-blue-100 text-blue-700">
            <TabsTrigger value="pribadi">
              <UserCheck className="w-4 h-4 mr-1.5" />
              Pribadi
            </TabsTrigger>
            <TabsTrigger value="password">
              <Lock className="w-4 h-4 mr-1.5" />
              Password
            </TabsTrigger>
            <TabsTrigger value="histori">
              <Receipt className="w-4 h-4 mr-1.5" />
              Histori
            </TabsTrigger>
          </TabsList>

          {/* Konten Tab 1: Informasi Pribadi */}
          <TabsContent value="pribadi" className="mt-4">
            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">
                  Informasi Pribadi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Form (Read Only) */}
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    value={userData.name}
                    readOnly
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={userData.email}
                    readOnly
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomer HP</Label>
                  <Input
                    id="phone"
                    value={userData.phone}
                    readOnly
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600"
                >
                  Edit Informasi
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Konten Tab 2: Ubah Password */}
          <TabsContent value="password" className="mt-4">
            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">
                  Ubah Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pass-old">Password Lama</Label>
                  <Input
                    id="pass-old"
                    type="password"
                    placeholder="••••••••"
                    value={password.old}
                    onChange={(e) =>
                      setPassword({ ...password, old: e.target.value })
                    }
                    className="bg-blue-50 border-blue-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pass-new">Password Baru</Label>
                  <Input
                    id="pass-new"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={password.new}
                    onChange={(e) =>
                      setPassword({ ...password, new: e.target.value })
                    }
                    className="bg-blue-50 border-blue-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pass-confirm">Konfirmasi Password Baru</Label>
                  <Input
                    id="pass-confirm"
                    type="password"
                    placeholder="Ulangi password baru"
                    value={password.confirm}
                    onChange={(e) =>
                      setPassword({ ...password, confirm: e.target.value })
                    }
                    className="bg-blue-50 border-blue-200"
                  />
                </div>

                {passError && (
                  <p className="text-xs text-red-600 text-center">
                    {passError}
                  </p>
                )}
                {passSuccess && (
                  <p className="text-xs text-green-600 text-center">
                    {passSuccess}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isPassLoading}
                >
                  {isPassLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Simpan Password Baru"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Konten Tab 3: Histori Transaksi */}
          <TabsContent value="histori" className="mt-4">
            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">
                  Histori Transaksi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {transactionData.length > 0 ? (
                  transactionData.map((tx) => (
                    <Link
                      href={`/invoice/${tx.id}`} // Asumsi ID transaksi = kode invoice
                      key={tx.id}
                      className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {tx.name}
                          </p>
                          <p className="text-xs text-gray-500">{tx.date}</p>
                        </div>
                        <div className="flex flex-col items-end ml-2">
                          <p className="text-sm font-bold text-blue-700">
                            {formatCurrency(tx.price)}
                          </p>
                          <Badge
                            variant={
                              tx.status === "Lunas" ? "default" : "destructive"
                            }
                            className={`text-xs ${
                              tx.status === "Lunas"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {tx.status}
                          </Badge>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Belum ada riwayat transaksi.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 3. Tombol Logout */}
        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full h-11 text-base font-semibold border-red-500 text-red-500 bg-white hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </main>
    </div>
  );
}