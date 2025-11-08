"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WidgetCardProps {
  type: "service" | "document";
  title: string;
  subtitle: string;
  time?: string;
  status?: "current" | "upcoming" | "completed" | "available";
  activity?: string; // Diubah dari 'document' agar sesuai dengan penggunaan di Home.tsx
  icon: React.ReactNode;
}

export default function WidgetCard({
  type,
  title,
  subtitle,
  time,
  status,
  activity, // Diubah dari 'document'
  icon,
}: WidgetCardProps) {
  // Logika untuk teks & warna badge
  const getStatusText = () => {
    switch (status) {
      case "current":
        return "Sekarang";
      case "upcoming":
        return "Berikutnya";
      case "completed":
        return "Selesai";
      case "available":
        return "Tersedia";
      default:
        return null;
    }
  };

  const getStatusClasses = () => {
    switch (status) {
      case "current":
        return "bg-green-600 text-white"; // 'success' diubah jadi hijau
      case "available":
        return "bg-blue-100 text-blue-700"; // Tema LegalAja
      case "upcoming":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    // Border disesuaikan
    <Card className="border-gray-200 hover:shadow-md transition-all duration-200 h-full relative">
      {/* Status Badge - Logika disesuaikan */}
      {status && (
        <Badge
          variant="secondary" // Varian netral
          className={`
            absolute -top-1 -right-1 z-10 text-xs px-2 py-1 shadow-sm
            ${getStatusClasses()}
          `}
        >
          {getStatusText()}
        </Badge>
      )}

      <CardContent className="p-2 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-center gap-2">
          {/* Latar ikon disesuaikan */}
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            {/* Font & warna disesuaikan */}
            <h3 className="font-semibold text-gray-800 text-xs leading-tight">
              {title}
            </h3>
            <p className="text-xs text-gray-500 leading-tight mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}