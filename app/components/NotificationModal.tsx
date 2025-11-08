"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Trash2,
  CheckCheck,
  FileCheck, // Ikon baru
  CreditCard, // Ikon baru
} from "lucide-react";

// Tipe notifikasi diubah
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "appointment" | "document" | "payment" | "system";
  isRead: boolean;
  createdAt: string;
}

// Data notifikasi disesuaikan untuk LegalAja
const dummyNotifications: Notification[] = [
  {
    id: "1",
    title: "Konsultasi Akan Datang",
    message:
      "Jadwal konsultasi Anda dengan Dr. Budi Santoso, S.H. akan dimulai dalam 15 menit.",
    type: "appointment",
    isRead: false,
    createdAt: "2025-11-09T10:45:00Z", // (Waktu disesuaikan agar relevan)
  },
  {
    id: "2",
    title: "Dokumen Telah Direview",
    message:
      "Jasa 'Review Kontrak NDA v1.2' Anda telah selesai. Silakan periksa hasilnya.",
    type: "document",
    isRead: false,
    createdAt: "2025-11-09T08:30:00Z",
  },
  {
    id: "3",
    title: "Pembayaran Berhasil",
    message:
      "Pembayaran untuk invoice LJ-DOC-1-123456 (Template Sewa) telah lunas.",
    type: "payment",
    isRead: true,
    createdAt: "2025-11-08T14:15:00Z",
  },
  {
    id: "4",
    title: "Reservasi Jasa Dikonfirmasi",
    message:
      "Jasa 'Pendirian PT' Anda telah dikonfirmasi oleh Notaris Siti Aminah, S.H.",
    type: "appointment",
    isRead: false,
    createdAt: "2025-11-08T11:00:00Z",
  },
  {
    id: "5",
    title: "Update Kebijakan Privasi",
    message:
      "Kami telah memperbarui kebijakan privasi kami. Silakan tinjau untuk informasi lebih lanjut.",
    type: "system",
    isRead: true,
    createdAt: "2025-11-07T16:45:00Z",
  },
];

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({
  isOpen,
  onClose,
}: NotificationModalProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load notifications from localStorage
  useEffect(() => {
    if (mounted) {
      // Key diubah ke legalaja_notifications
      const savedNotifications = localStorage.getItem("legalaja_notifications");
      if (savedNotifications) {
        try {
          setNotifications(JSON.parse(savedNotifications));
        } catch (error) {
          console.error("Error parsing notifications:", error);
        }
      }
    }
  }, [mounted]);

  // Save notifications to localStorage
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(
          "legalaja_notifications",
          JSON.stringify(notifications)
        );
      } catch (error) {
        console.error("Error saving notifications:", error);
      }
    }
  }, [notifications, mounted]);

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") {
      return !notification.isRead;
    }
    return true;
  });

  // Get unread count
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  // Get type icon and color (Disesuaikan untuk LegalAja)
  const getTypeInfo = (type: string) => {
    switch (type) {
      case "appointment":
        return { icon: Clock, color: "text-blue-600", bgColor: "bg-blue-100" };
      case "document":
        return {
          icon: FileCheck,
          color: "text-green-600",
          bgColor: "bg-green-100",
        };
      case "payment":
        return {
          icon: CreditCard,
          color: "text-indigo-600",
          bgColor: "bg-indigo-100",
        };
      case "system":
        return {
          icon: AlertCircle,
          color: "text-purple-600",
          bgColor: "bg-purple-100",
        };
      default:
        return { icon: Bell, color: "text-gray-600", bgColor: "bg-gray-100" };
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 1) {
      return "Baru saja";
    }
    if (diffMinutes < 60) {
      return `${diffMinutes} menit lalu`;
    } else if (diffHours < 24) {
      return `${diffHours} jam lalu`;
    } else if (diffDays === 1) {
      return "Kemarin";
    } else if (diffDays < 7) {
      return `${diffDays} hari lalu`;
    } else {
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-700" />
              Notifikasi
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                <CheckCheck className="w-4 h-4 mr-1" />
                Tandai Semua
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Filter */}
        <div className="flex gap-2 pb-4">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={`flex-1 ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Semua
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
            className={`flex-1 ${
              filter === "unread"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Belum Dibaca
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto space-y-3 -mr-3 pr-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">
                {filter === "unread"
                  ? "Tidak ada notifikasi baru"
                  : "Belum ada notifikasi"}
              </h3>
              <p className="text-sm text-gray-500">
                {filter === "unread"
                  ? "Semua notifikasi telah dibaca"
                  : "Notifikasi akan muncul di sini"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const typeInfo = getTypeInfo(notification.type);
              const IconComponent = typeInfo.icon;

              return (
                <Card
                  key={notification.id}
                  className={`border-gray-200 transition-all duration-200 ${
                    !notification.isRead ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeInfo.bgColor}`}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${typeInfo.color}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3
                            className={`font-semibold ${
                              !notification.isRead
                                ? "text-gray-900"
                                : "text-gray-500"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5 ml-2"></div>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {formatDate(notification.createdAt)}
                          </span>

                          <div className="flex items-center gap-1">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 h-6 w-6 text-gray-500 hover:text-blue-600"
                              >
                                <CheckCircle className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="p-1 h-6 w-6 text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}