"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  User,
  ArrowLeft,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NotificationButton from "../components/NotificationButton";

// --- Dummy Data untuk Riwayat Chat ---
type ChatHistory = {
  id: string; // Ini akan menjadi ID untuk dynamic route chat/[id]
  lawyerName: string;
  lawyerAvatar: string;
  specialty: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
};

const chatData: ChatHistory[] = [
  {
    id: "C-123-456",
    lawyerName: "Dr. Budi Santoso, S.H., M.H.",
    lawyerAvatar: "/LegalApp-logo.png", // Ganti dengan path
    specialty: "Hukum Keluarga",
    lastMessage: "Baik, Pak. Mohon kirimkan draf kontraknya agar...",
    lastMessageTimestamp: "2025-11-09T10:45:00Z", // 10 menit lalu (simulasi)
    unreadCount: 2,
  },
  {
    id: "C-789-012",
    lawyerName: "Siti Aminah, S.H.",
    lawyerAvatar: "/LegalApp-logo.png", // Ganti dengan path
    specialty: "Hukum Bisnis",
    lastMessage: "Sudah saya terima. Terima kasih banyak, Bu.",
    lastMessageTimestamp: "2025-11-08T15:30:00Z", // Kemarin (simulasi)
    unreadCount: 0,
  },
  {
    id: "C-345-678",
    lawyerName: "Rizky Pratama, S.H.",
    lawyerAvatar: "/LegalApp-logo.png", // Ganti dengan path
    specialty: "Hukum Properti",
    lastMessage: "Sama-sama. Semoga lancar prosesnya ya.",
    lastMessageTimestamp: "2025-11-06T09:15:00Z", // 3 hari lalu
    unreadCount: 0,
  },
];
// --- Akhir Dummy Data ---

export default function KasusSayaPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Format tanggal (copy dari NotificationModal)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 1) return "Baru saja";
    if (diffMinutes < 60) return `${diffMinutes} mnt`;
    if (diffHours < 24) return `${diffHours} jam`;
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return `${diffDays} hari`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  // --- Logika Filter ---
  const filteredChats = useMemo(() => {
    return chatData.filter(
      (chat) =>
        chat.lawyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
                <h1 className="text-lg font-bold text-blue-700">Kasus Saya</h1>
              </div>
              <div className="flex items-center gap-2">
                <NotificationButton />
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 transition-colors duration-200"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari percakapan..."
            className="pl-10 h-11 text-base border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* --- Daftar Percakapan --- */}
        <div className="space-y-3">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <Link
                href={`/chat/${chat.id}`} // Sesuai permintaan
                key={chat.id}
                className="block w-full"
              >
                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-150 gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <Image
                      src={chat.lawyerAvatar}
                      alt={chat.lawyerName}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/48x48/EBF4FF/1D4ED8?text=${chat.lawyerName
                          .charAt(0)
                          .toUpperCase()}`;
                      }}
                    />
                  </div>

                  {/* Info Chat */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm text-gray-900 truncate">
                        {chat.lawyerName}
                      </h4>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {formatDate(chat.lastMessageTimestamp)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <p className="text-sm text-gray-500 truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <Badge className="w-5 h-5 p-0 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs flex-shrink-0 ml-2">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Indikator */}
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </Link>
            ))
          ) : (
            // --- Empty State ---
            <Card className="border-gray-200 bg-white">
              <CardContent className="p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  {searchTerm
                    ? "Percakapan tidak ditemukan"
                    : "Belum Ada Kasus Aktif"}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {searchTerm
                    ? "Coba gunakan kata kunci lain."
                    : "Konsultasi yang sudah dimulai akan muncul di sini."}
                </p>
                {!searchTerm && (
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/konsultasi">Mulai Konsultasi Baru</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}