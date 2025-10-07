"use client";

import { Play, Clock, Users, RefreshCw, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface KajianItem {
  id: string;
  title: string;
  ustadz: string;
  duration: string; // mm:ss
  views: string;
  date: string; // ISO
}

const allUstadz = [
  "Ust. Syafiq Riza Basalamah",
  "Ust. Abdul Hakim bin Amir Abdat",
  "Ust. Yazid bin Abdul Qadir Jawas",
  "Ust. Anas Burhanuddin",
] as const;

const kajianData: KajianItem[] = [
  {
    id: "k1",
    title: "Keutamaan Sholat Berjamaah",
    ustadz: "Ust. Syafiq Riza Basalamah",
    duration: "45:30",
    views: "12.5K",
    date: "2024-05-01",
  },
  {
    id: "k2",
    title: "Hikmah Puasa Sunnah",
    ustadz: "Ust. Abdul Hakim bin Amir Abdat",
    duration: "38:15",
    views: "8.2K",
    date: "2024-04-15",
  },
  {
    id: "k3",
    title: "Menjaga Lisan dalam Islam",
    ustadz: "Ust. Yazid bin Abdul Qadir Jawas",
    duration: "52:10",
    views: "15.7K",
    date: "2024-06-10",
  },
  {
    id: "k4",
    title: "Adab Penuntut Ilmu",
    ustadz: "Ust. Anas Burhanuddin",
    duration: "40:05",
    views: "6.9K",
    date: "2024-03-20",
  },
];

export default function KajianPage() {
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [selectedUstadz, setSelectedUstadz] = useState<string | null>(null);

  const filteredKajian = useMemo(() => {
    let list = [...kajianData];
    if (selectedUstadz) {
      list = list.filter((k) => k.ustadz === selectedUstadz);
    }
    list.sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return list;
  }, [sortBy, selectedUstadz]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md shadow-sm border-b border-awqaf-border-light sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-awqaf-primary font-comfortaa">
            Kajian Islam
          </h1>
          <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
            Belajar dan memperdalam ilmu agama
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-accent-100 to-accent-200 rounded-2xl p-6 border border-accent-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/60 rounded-full flex items-center justify-center border border-awqaf-border-light">
              <GraduationCap className="w-6 h-6 text-awqaf-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-awqaf-primary font-comfortaa">
                Kajian Islam Terbaru
              </h2>
              <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                Dengarkan kajian pilihan dari para ustadz.
              </p>
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            {/* Sort select */}
            <div className="flex-1">
              <label className="block text-xs mb-1 text-awqaf-foreground-secondary font-comfortaa">
                Urutkan
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "newest" | "oldest")
                }
                className="w-full h-10 px-3 rounded-md border border-awqaf-border-light bg-background text-sm font-comfortaa"
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
              </select>
            </div>

            {/* Ustadz select */}
            <div className="flex-1">
              <label className="block text-xs mb-1 text-awqaf-foreground-secondary font-comfortaa">
                Ustadz
              </label>
              <select
                value={selectedUstadz || ""}
                onChange={(e) => setSelectedUstadz(e.target.value || null)}
                className="w-full h-10 px-3 rounded-md border border-awqaf-border-light bg-background text-sm font-comfortaa"
              >
                <option value="">Semua Ustadz</option>
                {allUstadz.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(selectedUstadz || sortBy !== "newest") && (
            <div className="mt-3">
              <button
                className="px-3 py-2 rounded-md text-sm border bg-background border-awqaf-border-light flex items-center gap-1"
                onClick={() => {
                  setSelectedUstadz(null);
                  setSortBy("newest");
                }}
              >
                <RefreshCw className="w-4 h-4" /> Reset
              </button>
            </div>
          )}
        </div>

        {/* Kajian List */}
        <div className="bg-card rounded-2xl shadow-sm p-6 border border-awqaf-border-light mb-6">
          <h3 className="font-semibold text-card-foreground mb-4 font-comfortaa">
            Daftar Kajian
          </h3>
          <div className="space-y-3">
            {filteredKajian.map((k) => (
              <Link key={k.id} href={`/kajian/${k.id}`}>
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent-50 transition-all duration-200">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-awqaf-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-card-foreground font-comfortaa text-sm line-clamp-2">
                      {k.title}
                    </h4>
                    <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                      {k.ustadz}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-awqaf-foreground-secondary font-comfortaa">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {k.duration}
                      </div>
                      <div>
                        {new Date(k.date).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {k.views}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-gradient-to-r from-accent-100 to-accent-200 rounded-2xl p-6 border border-accent-200">
          <div className="text-center">
            <h4 className="font-semibold text-awqaf-primary font-comfortaa mb-2">
              Akses Cepat
            </h4>
            <p className="text-awqaf-foreground-secondary text-sm font-comfortaa">
              Dapatkan notifikasi kajian terbaru dan jadwal live streaming
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
