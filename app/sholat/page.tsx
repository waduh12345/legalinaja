"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  MapPin,
  Calendar,
  Navigation,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Location {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

interface PrayerTime {
  name: string;
  arabic: string;
  time: string;
  status: "completed" | "current" | "upcoming";
}

export default function SholatPage() {
  const [location, setLocation] = useState<Location | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<
    "granted" | "denied" | "prompt" | "unknown"
  >("unknown");

  // Sample prayer times data (in real app, this would come from an API)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPrayerTimes = (_lat: number, _lng: number): PrayerTime[] => {
    // This is sample data - in real implementation, you would call a prayer times API
    // _lat and _lng would be used to calculate accurate prayer times
    return [
      { name: "Subuh", arabic: "الفجر", time: "04:45", status: "completed" },
      { name: "Dzuhur", arabic: "الظهر", time: "12:15", status: "current" },
      { name: "Ashar", arabic: "العصر", time: "15:30", status: "upcoming" },
      { name: "Maghrib", arabic: "المغرب", time: "18:20", status: "upcoming" },
      { name: "Isya", arabic: "العشاء", time: "19:35", status: "upcoming" },
    ];
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung oleh browser ini");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocoding to get city name (in real app, use a proper geocoding service)
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
          );
          const data = await response.json();

          const newLocation: Location = {
            latitude,
            longitude,
            city: data.city || data.locality || "Lokasi tidak diketahui",
            country: data.countryName || "Indonesia",
          };

          setLocation(newLocation);
          setPrayerTimes(getPrayerTimes(latitude, longitude));
          setPermissionStatus("granted");
        } catch {
          setError("Gagal mendapatkan nama lokasi");
          // Still set location with coordinates even if geocoding fails
          const newLocation: Location = {
            latitude,
            longitude,
            city: "Lokasi saat ini",
            country: "Indonesia",
          };
          setLocation(newLocation);
          setPrayerTimes(getPrayerTimes(latitude, longitude));
        }

        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        setPermissionStatus("denied");
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError(
              "Akses lokasi ditolak. Silakan izinkan akses lokasi untuk melihat jadwal sholat."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Informasi lokasi tidak tersedia.");
            break;
          case error.TIMEOUT:
            setError("Permintaan lokasi timeout.");
            break;
          default:
            setError("Terjadi kesalahan saat mendapatkan lokasi.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  useEffect(() => {
    // Check if geolocation is available
    if (navigator.geolocation) {
      setPermissionStatus("prompt");
    } else {
      setError("Geolocation tidak didukung oleh browser ini");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="relative bg-background/90 backdrop-blur-md rounded-2xl border border-awqaf-border-light/50 shadow-lg px-4 py-3">
            <h1 className="text-xl font-bold text-awqaf-primary font-comfortaa text-center">
              Jadwal Sholat
            </h1>
            <p className="text-sm text-awqaf-foreground-secondary font-comfortaa text-center mt-1">
              Waktu sholat berdasarkan lokasi Anda
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Location Card */}
        <Card className="border-awqaf-border-light">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-awqaf-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-card-foreground font-comfortaa">
                  Lokasi Saat Ini
                </h2>
                {location ? (
                  <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                    {location.city}, {location.country}
                  </p>
                ) : (
                  <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                    Lokasi belum ditentukan
                  </p>
                )}
              </div>
              {permissionStatus === "granted" && (
                <CheckCircle className="w-5 h-5 text-success" />
              )}
            </div>

            {!location && (
              <div className="space-y-3">
                <Button
                  onClick={getCurrentLocation}
                  disabled={isLoading}
                  className="w-full bg-awqaf-primary hover:bg-awqaf-primary/90 text-white font-comfortaa"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mendapatkan lokasi...
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4 mr-2" />
                      Gunakan Lokasi Saat Ini
                    </>
                  )}
                </Button>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-error/10 border border-error/20 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-error flex-shrink-0" />
                    <p className="text-sm text-error font-comfortaa">{error}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prayer Times */}
        {location && prayerTimes.length > 0 && (
          <Card className="border-awqaf-border-light">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-awqaf-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground font-comfortaa">
                    Jadwal Sholat Hari Ini
                  </h3>
                  <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                    {new Date().toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {prayerTimes.map((prayer) => (
                  <div
                    key={prayer.name}
                    className={`
                    flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200
                    ${
                      prayer.status === "current"
                        ? "bg-accent-100 border border-accent-200"
                        : "hover:bg-accent-50"
                    }
                  `}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${
                          prayer.status === "current"
                            ? "bg-awqaf-primary text-white"
                            : "bg-accent-100 text-awqaf-primary"
                        }
                      `}
                      >
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-card-foreground font-comfortaa font-semibold text-lg">
                          {prayer.name}
                        </span>
                        <p className="text-sm text-awqaf-primary font-tajawal">
                          {prayer.arabic}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`
                        font-comfortaa font-bold text-xl
                        ${
                          prayer.status === "current"
                            ? "text-awqaf-primary"
                            : "text-awqaf-foreground-secondary"
                        }
                      `}
                      >
                        {prayer.time}
                      </span>
                      {prayer.status === "current" && (
                        <p className="text-xs text-success font-comfortaa mt-1">
                          Sedang berlangsung
                        </p>
                      )}
                      {prayer.status === "completed" && (
                        <p className="text-xs text-awqaf-foreground-secondary font-comfortaa mt-1">
                          Selesai
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Location Message */}
        {!location && !isLoading && (
          <Card className="border-awqaf-border-light">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-awqaf-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground font-comfortaa mb-2">
                Lokasi Diperlukan
              </h3>
              <p className="text-sm text-awqaf-foreground-secondary font-comfortaa mb-4">
                Untuk menampilkan jadwal sholat yang akurat, aplikasi memerlukan
                akses ke lokasi Anda.
              </p>
              <Button
                onClick={getCurrentLocation}
                className="bg-awqaf-primary hover:bg-awqaf-primary/90 text-white font-comfortaa"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Izinkan Akses Lokasi
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
