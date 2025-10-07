"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, BookOpen, Bookmark, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SurahCard from "../components/SurahCard";
import SurahFilter from "../components/SurahFilter";
import { useRouter } from "next/navigation";

interface Surah {
  number: number;
  name: string;
  arabic: string;
  verses: number;
  juz: number;
  revelation: "Meccan" | "Medinan";
  lastRead?: string;
}

export default function QuranPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
  const [selectedRevelation, setSelectedRevelation] = useState<
    "all" | "Meccan" | "Medinan"
  >("all");
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState<number[]>([]);
  const [recentSurahs, setRecentSurahs] = useState<number[]>([]);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);

  // Sample Quran data (in real app, this would come from an API)
  const allSurahs: Surah[] = useMemo(
    () => [
      {
        number: 1,
        name: "Al-Fatihah",
        arabic: "الفاتحة",
        verses: 7,
        juz: 1,
        revelation: "Meccan",
        lastRead: "2 menit yang lalu",
      },
      {
        number: 2,
        name: "Al-Baqarah",
        arabic: "البقرة",
        verses: 286,
        juz: 1,
        revelation: "Medinan",
        lastRead: "1 jam yang lalu",
      },
      {
        number: 3,
        name: "Ali 'Imran",
        arabic: "آل عمران",
        verses: 200,
        juz: 2,
        revelation: "Medinan",
        lastRead: "Kemarin",
      },
      {
        number: 4,
        name: "An-Nisa",
        arabic: "النساء",
        verses: 176,
        juz: 2,
        revelation: "Medinan",
      },
      {
        number: 5,
        name: "Al-Maidah",
        arabic: "المائدة",
        verses: 120,
        juz: 3,
        revelation: "Medinan",
      },
      {
        number: 6,
        name: "Al-An'am",
        arabic: "الأنعام",
        verses: 165,
        juz: 3,
        revelation: "Meccan",
      },
      {
        number: 7,
        name: "Al-A'raf",
        arabic: "الأعراف",
        verses: 206,
        juz: 4,
        revelation: "Meccan",
      },
      {
        number: 8,
        name: "Al-Anfal",
        arabic: "الأنفال",
        verses: 75,
        juz: 4,
        revelation: "Medinan",
      },
      {
        number: 9,
        name: "At-Taubah",
        arabic: "التوبة",
        verses: 129,
        juz: 5,
        revelation: "Medinan",
      },
      {
        number: 10,
        name: "Yunus",
        arabic: "يونس",
        verses: 109,
        juz: 5,
        revelation: "Meccan",
      },
      {
        number: 11,
        name: "Hud",
        arabic: "هود",
        verses: 123,
        juz: 6,
        revelation: "Meccan",
      },
      {
        number: 12,
        name: "Yusuf",
        arabic: "يوسف",
        verses: 111,
        juz: 6,
        revelation: "Meccan",
      },
      {
        number: 13,
        name: "Ar-Ra'd",
        arabic: "الرعد",
        verses: 43,
        juz: 7,
        revelation: "Medinan",
      },
      {
        number: 14,
        name: "Ibrahim",
        arabic: "إبراهيم",
        verses: 52,
        juz: 7,
        revelation: "Meccan",
      },
      {
        number: 15,
        name: "Al-Hijr",
        arabic: "الحجر",
        verses: 99,
        juz: 8,
        revelation: "Meccan",
      },
      {
        number: 16,
        name: "An-Nahl",
        arabic: "النحل",
        verses: 128,
        juz: 8,
        revelation: "Meccan",
      },
      {
        number: 17,
        name: "Al-Isra",
        arabic: "الإسراء",
        verses: 111,
        juz: 9,
        revelation: "Meccan",
      },
      {
        number: 18,
        name: "Al-Kahf",
        arabic: "الكهف",
        verses: 110,
        juz: 9,
        revelation: "Meccan",
      },
      {
        number: 19,
        name: "Maryam",
        arabic: "مريم",
        verses: 98,
        juz: 10,
        revelation: "Meccan",
      },
      {
        number: 20,
        name: "Taha",
        arabic: "طه",
        verses: 135,
        juz: 10,
        revelation: "Meccan",
      },
      {
        number: 21,
        name: "Al-Anbiya",
        arabic: "الأنبياء",
        verses: 112,
        juz: 11,
        revelation: "Meccan",
      },
      {
        number: 22,
        name: "Al-Hajj",
        arabic: "الحج",
        verses: 78,
        juz: 11,
        revelation: "Medinan",
      },
      {
        number: 23,
        name: "Al-Mu'minun",
        arabic: "المؤمنون",
        verses: 118,
        juz: 12,
        revelation: "Meccan",
      },
      {
        number: 24,
        name: "An-Nur",
        arabic: "النور",
        verses: 64,
        juz: 12,
        revelation: "Medinan",
      },
      {
        number: 25,
        name: "Al-Furqan",
        arabic: "الفرقان",
        verses: 77,
        juz: 13,
        revelation: "Meccan",
      },
      {
        number: 26,
        name: "Ash-Shu'ara",
        arabic: "الشعراء",
        verses: 227,
        juz: 13,
        revelation: "Meccan",
      },
      {
        number: 27,
        name: "An-Naml",
        arabic: "النمل",
        verses: 93,
        juz: 14,
        revelation: "Meccan",
      },
      {
        number: 28,
        name: "Al-Qasas",
        arabic: "القصص",
        verses: 88,
        juz: 14,
        revelation: "Meccan",
      },
      {
        number: 29,
        name: "Al-Ankabut",
        arabic: "العنكبوت",
        verses: 69,
        juz: 15,
        revelation: "Meccan",
      },
      {
        number: 30,
        name: "Ar-Rum",
        arabic: "الروم",
        verses: 60,
        juz: 15,
        revelation: "Meccan",
      },
      {
        number: 31,
        name: "Luqman",
        arabic: "لقمان",
        verses: 34,
        juz: 16,
        revelation: "Meccan",
      },
      {
        number: 32,
        name: "As-Sajdah",
        arabic: "السجدة",
        verses: 30,
        juz: 16,
        revelation: "Meccan",
      },
      {
        number: 33,
        name: "Al-Ahzab",
        arabic: "الأحزاب",
        verses: 73,
        juz: 17,
        revelation: "Medinan",
      },
      {
        number: 34,
        name: "Saba",
        arabic: "سبأ",
        verses: 54,
        juz: 17,
        revelation: "Meccan",
      },
      {
        number: 35,
        name: "Fatir",
        arabic: "فاطر",
        verses: 45,
        juz: 18,
        revelation: "Meccan",
      },
      {
        number: 36,
        name: "Ya-Sin",
        arabic: "يس",
        verses: 83,
        juz: 18,
        revelation: "Meccan",
      },
      {
        number: 37,
        name: "As-Saffat",
        arabic: "الصافات",
        verses: 182,
        juz: 19,
        revelation: "Meccan",
      },
      {
        number: 38,
        name: "Sad",
        arabic: "ص",
        verses: 88,
        juz: 19,
        revelation: "Meccan",
      },
      {
        number: 39,
        name: "Az-Zumar",
        arabic: "الزمر",
        verses: 75,
        juz: 20,
        revelation: "Meccan",
      },
      {
        number: 40,
        name: "Ghafir",
        arabic: "غافر",
        verses: 85,
        juz: 20,
        revelation: "Meccan",
      },
      {
        number: 41,
        name: "Fussilat",
        arabic: "فصلت",
        verses: 54,
        juz: 21,
        revelation: "Meccan",
      },
      {
        number: 42,
        name: "Ash-Shura",
        arabic: "الشورى",
        verses: 53,
        juz: 21,
        revelation: "Meccan",
      },
      {
        number: 43,
        name: "Az-Zukhruf",
        arabic: "الزخرف",
        verses: 89,
        juz: 22,
        revelation: "Meccan",
      },
      {
        number: 44,
        name: "Ad-Dukhan",
        arabic: "الدخان",
        verses: 59,
        juz: 22,
        revelation: "Meccan",
      },
      {
        number: 45,
        name: "Al-Jathiyah",
        arabic: "الجاثية",
        verses: 37,
        juz: 23,
        revelation: "Meccan",
      },
      {
        number: 46,
        name: "Al-Ahqaf",
        arabic: "الأحقاف",
        verses: 35,
        juz: 23,
        revelation: "Meccan",
      },
      {
        number: 47,
        name: "Muhammad",
        arabic: "محمد",
        verses: 38,
        juz: 24,
        revelation: "Medinan",
      },
      {
        number: 48,
        name: "Al-Fath",
        arabic: "الفتح",
        verses: 29,
        juz: 24,
        revelation: "Medinan",
      },
      {
        number: 49,
        name: "Al-Hujurat",
        arabic: "الحجرات",
        verses: 18,
        juz: 25,
        revelation: "Medinan",
      },
      {
        number: 50,
        name: "Qaf",
        arabic: "ق",
        verses: 45,
        juz: 25,
        revelation: "Meccan",
      },
      {
        number: 51,
        name: "Adh-Dhariyat",
        arabic: "الذاريات",
        verses: 60,
        juz: 26,
        revelation: "Meccan",
      },
      {
        number: 52,
        name: "At-Tur",
        arabic: "الطور",
        verses: 49,
        juz: 26,
        revelation: "Meccan",
      },
      {
        number: 53,
        name: "An-Najm",
        arabic: "النجم",
        verses: 62,
        juz: 27,
        revelation: "Meccan",
      },
      {
        number: 54,
        name: "Al-Qamar",
        arabic: "القمر",
        verses: 55,
        juz: 27,
        revelation: "Meccan",
      },
      {
        number: 55,
        name: "Ar-Rahman",
        arabic: "الرحمن",
        verses: 78,
        juz: 28,
        revelation: "Medinan",
      },
      {
        number: 56,
        name: "Al-Waqi'ah",
        arabic: "الواقعة",
        verses: 96,
        juz: 28,
        revelation: "Meccan",
      },
      {
        number: 57,
        name: "Al-Hadid",
        arabic: "الحديد",
        verses: 29,
        juz: 29,
        revelation: "Medinan",
      },
      {
        number: 58,
        name: "Al-Mujadilah",
        arabic: "المجادلة",
        verses: 22,
        juz: 29,
        revelation: "Medinan",
      },
      {
        number: 59,
        name: "Al-Hashr",
        arabic: "الحشر",
        verses: 24,
        juz: 29,
        revelation: "Medinan",
      },
      {
        number: 60,
        name: "Al-Mumtahanah",
        arabic: "الممتحنة",
        verses: 13,
        juz: 30,
        revelation: "Medinan",
      },
      {
        number: 61,
        name: "As-Saff",
        arabic: "الصف",
        verses: 14,
        juz: 30,
        revelation: "Medinan",
      },
      {
        number: 62,
        name: "Al-Jumu'ah",
        arabic: "الجمعة",
        verses: 11,
        juz: 30,
        revelation: "Medinan",
      },
      {
        number: 63,
        name: "Al-Munafiqun",
        arabic: "المنافقون",
        verses: 11,
        juz: 30,
        revelation: "Medinan",
      },
      {
        number: 64,
        name: "At-Taghabun",
        arabic: "التغابن",
        verses: 18,
        juz: 30,
        revelation: "Medinan",
      },
      {
        number: 65,
        name: "At-Talaq",
        arabic: "الطلاق",
        verses: 12,
        juz: 30,
        revelation: "Medinan",
      },
      {
        number: 66,
        name: "At-Tahrim",
        arabic: "التحريم",
        verses: 12,
        juz: 30,
        revelation: "Medinan",
      },
      {
        number: 67,
        name: "Al-Mulk",
        arabic: "الملك",
        verses: 30,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 68,
        name: "Al-Qalam",
        arabic: "القلم",
        verses: 52,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 69,
        name: "Al-Haqqah",
        arabic: "الحاقة",
        verses: 52,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 70,
        name: "Al-Ma'arij",
        arabic: "المعارج",
        verses: 44,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 71,
        name: "Nuh",
        arabic: "نوح",
        verses: 28,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 72,
        name: "Al-Jinn",
        arabic: "الجن",
        verses: 28,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 73,
        name: "Al-Muzzammil",
        arabic: "المزمل",
        verses: 20,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 74,
        name: "Al-Muddaththir",
        arabic: "المدثر",
        verses: 56,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 75,
        name: "Al-Qiyamah",
        arabic: "القيامة",
        verses: 40,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 76,
        name: "Al-Insan",
        arabic: "الإنسان",
        verses: 31,
        juz: 30,
        revelation: "Medinan",
      },
      {
        number: 77,
        name: "Al-Mursalat",
        arabic: "المرسلات",
        verses: 50,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 78,
        name: "An-Naba",
        arabic: "النبأ",
        verses: 40,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 79,
        name: "An-Nazi'at",
        arabic: "النازعات",
        verses: 46,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 80,
        name: "Abasa",
        arabic: "عبس",
        verses: 42,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 81,
        name: "At-Takwir",
        arabic: "التكوير",
        verses: 29,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 82,
        name: "Al-Infitar",
        arabic: "الانفطار",
        verses: 19,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 83,
        name: "Al-Mutaffifin",
        arabic: "المطففين",
        verses: 36,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 84,
        name: "Al-Inshiqaq",
        arabic: "الانشقاق",
        verses: 25,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 85,
        name: "Al-Buruj",
        arabic: "البروج",
        verses: 22,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 86,
        name: "At-Tariq",
        arabic: "الطارق",
        verses: 17,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 87,
        name: "Al-A'la",
        arabic: "الأعلى",
        verses: 19,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 88,
        name: "Al-Ghashiyah",
        arabic: "الغاشية",
        verses: 26,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 89,
        name: "Al-Fajr",
        arabic: "الفجر",
        verses: 30,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 90,
        name: "Al-Balad",
        arabic: "البلد",
        verses: 20,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 91,
        name: "Ash-Shams",
        arabic: "الشمس",
        verses: 15,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 92,
        name: "Al-Layl",
        arabic: "الليل",
        verses: 21,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 93,
        name: "Ad-Duha",
        arabic: "الضحى",
        verses: 11,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 94,
        name: "Ash-Sharh",
        arabic: "الشرح",
        verses: 8,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 95,
        name: "At-Tin",
        arabic: "التين",
        verses: 8,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 96,
        name: "Al-Alaq",
        arabic: "العلق",
        verses: 19,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 97,
        name: "Al-Qadr",
        arabic: "القدر",
        verses: 5,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 98,
        name: "Al-Bayyinah",
        arabic: "البينة",
        verses: 8,
        juz: 30,
        revelation: "Medinan",
      },
      {
        number: 99,
        name: "Az-Zalzalah",
        arabic: "الزلزلة",
        verses: 8,
        juz: 30,
        revelation: "Medinan",
      },
      {
        number: 100,
        name: "Al-Adiyat",
        arabic: "العاديات",
        verses: 11,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 101,
        name: "Al-Qari'ah",
        arabic: "القارعة",
        verses: 11,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 102,
        name: "At-Takathur",
        arabic: "التكاثر",
        verses: 8,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 103,
        name: "Al-Asr",
        arabic: "العصر",
        verses: 3,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 104,
        name: "Al-Humazah",
        arabic: "الهمزة",
        verses: 9,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 105,
        name: "Al-Fil",
        arabic: "الفيل",
        verses: 5,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 106,
        name: "Quraysh",
        arabic: "قريش",
        verses: 4,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 107,
        name: "Al-Ma'un",
        arabic: "الماعون",
        verses: 7,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 108,
        name: "Al-Kawthar",
        arabic: "الكوثر",
        verses: 3,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 109,
        name: "Al-Kafirun",
        arabic: "الكافرون",
        verses: 6,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 110,
        name: "An-Nasr",
        arabic: "النصر",
        verses: 3,
        juz: 30,
        revelation: "Medinan",
      },
      {
        number: 111,
        name: "Al-Masad",
        arabic: "المسد",
        verses: 5,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 112,
        name: "Al-Ikhlas",
        arabic: "الإخلاص",
        verses: 4,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 113,
        name: "Al-Falaq",
        arabic: "الفلق",
        verses: 5,
        juz: 30,
        revelation: "Meccan",
      },
      {
        number: 114,
        name: "An-Nas",
        arabic: "الناس",
        verses: 6,
        juz: 30,
        revelation: "Meccan",
      },
    ],
    []
  );

  // Load bookmarked surahs from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("quran-bookmarks");
    if (savedBookmarks) {
      setBookmarkedSurahs(JSON.parse(savedBookmarks));
    }
  }, []);

  // Load recent surahs from localStorage
  useEffect(() => {
    const savedRecent = localStorage.getItem("quran-recent");
    if (savedRecent) {
      setRecentSurahs(JSON.parse(savedRecent));
    }
  }, []);

  // Filter surahs based on search and filters
  const filteredSurahs = useMemo(() => {
    return allSurahs.filter((surah) => {
      const matchesSearch =
        searchQuery === "" ||
        surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.arabic.includes(searchQuery);

      const matchesJuz = selectedJuz === null || surah.juz === selectedJuz;
      const matchesRevelation =
        selectedRevelation === "all" || surah.revelation === selectedRevelation;

      return matchesSearch && matchesJuz && matchesRevelation;
    });
  }, [searchQuery, selectedJuz, selectedRevelation, allSurahs]);

  // Get recent surahs with details
  const recentSurahsWithDetails = useMemo(() => {
    return recentSurahs
      .map((surahNumber) => allSurahs.find((s) => s.number === surahNumber))
      .filter(Boolean)
      .slice(0, 5) as Surah[];
  }, [recentSurahs, allSurahs]);

  // Get bookmarked surahs with details
  const bookmarkedSurahsWithDetails = useMemo(() => {
    return bookmarkedSurahs
      .map((surahNumber) => allSurahs.find((s) => s.number === surahNumber))
      .filter(Boolean) as Surah[];
  }, [bookmarkedSurahs, allSurahs]);

  // Handle bookmark toggle
  const handleBookmark = (surahNumber: number) => {
    const newBookmarks = bookmarkedSurahs.includes(surahNumber)
      ? bookmarkedSurahs.filter((num) => num !== surahNumber)
      : [...bookmarkedSurahs, surahNumber];

    setBookmarkedSurahs(newBookmarks);
    localStorage.setItem("quran-bookmarks", JSON.stringify(newBookmarks));
  };

  // Handle surah click (for recent tracking)
  const handleSurahClick = (surahNumber: number) => {
    const newRecent = [
      surahNumber,
      ...recentSurahs.filter((num) => num !== surahNumber),
    ].slice(0, 10);
    setRecentSurahs(newRecent);
    localStorage.setItem("quran-recent", JSON.stringify(newRecent));
  };

  // Open bookmarked surah: update recent and navigate
  const openBookmarkedSurah = (surahNumber: number) => {
    handleSurahClick(surahNumber);
    setIsBookmarkOpen(false);
    router.push(`/quran/${surahNumber}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="relative bg-background/90 backdrop-blur-md rounded-2xl border border-awqaf-border-light/50 shadow-lg px-4 py-3">
            <h1 className="text-xl font-bold text-awqaf-primary font-comfortaa text-center">
              Al-Qur&apos;an
            </h1>
            <p className="text-sm text-awqaf-foreground-secondary font-comfortaa text-center mt-1">
              Kitab suci umat Islam
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search Bar */}
        <Card className="border-awqaf-border-light">
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-5 h-5 text-awqaf-foreground-secondary" />
              <Input
                type="text"
                placeholder="Cari surah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent text-awqaf-foreground placeholder-awqaf-foreground-secondary font-comfortaa focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Filter */}
            <SurahFilter
              selectedJuz={selectedJuz}
              onJuzChange={setSelectedJuz}
              selectedRevelation={selectedRevelation}
              onRevelationChange={setSelectedRevelation}
            />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-awqaf-border-light hover:shadow-md transition-all duration-200 cursor-pointer group">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-accent-200 transition-colors duration-200">
                <BookOpen className="w-6 h-6 text-awqaf-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground text-sm font-comfortaa mb-1">
                Baca Al-Qur&apos;an
              </h3>
              <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                Mulai dari surah Al-Fatihah
              </p>
            </CardContent>
          </Card>

          <Card
            onClick={() => setIsBookmarkOpen(true)}
            className="border-awqaf-border-light hover:shadow-md transition-all duration-200 cursor-pointer group"
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-accent-200 transition-colors duration-200">
                <Bookmark className="w-6 h-6 text-info" />
              </div>
              <h3 className="font-semibold text-card-foreground text-sm font-comfortaa mb-1">
                Bookmark
              </h3>
              <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                {bookmarkedSurahs.length} surah tersimpan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bookmarked Surahs Dialog */}
        <Dialog open={isBookmarkOpen} onOpenChange={setIsBookmarkOpen}>
          <DialogContent className="border-awqaf-border-light p-0">
            <DialogHeader className="p-4">
              <DialogTitle className="font-comfortaa">
                Surah Tersimpan
              </DialogTitle>
            </DialogHeader>
            <div className="px-4 pb-4">
              {bookmarkedSurahsWithDetails.length === 0 ? (
                <p className="text-sm text-awqaf-foreground-secondary font-comfortaa text-center py-6">
                  Belum ada surah yang dibookmark
                </p>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto mobile-scroll">
                  {bookmarkedSurahsWithDetails.map((surah) => (
                    <div
                      key={surah.number}
                      onClick={() => openBookmarkedSurah(surah.number)}
                      className="flex items-center justify-between p-3 rounded-md border border-awqaf-border-light hover:bg-accent-50 cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold font-comfortaa text-card-foreground">
                          {surah.number}. {surah.name}
                        </p>
                        <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                          {surah.arabic} • {surah.verses} ayat
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Recent Surahs */}
        {recentSurahsWithDetails.length > 0 && (
          <Card className="border-awqaf-border-light">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-awqaf-primary" />
                <h3 className="font-semibold text-card-foreground font-comfortaa">
                  Baru Dibaca
                </h3>
              </div>

              <div className="space-y-3">
                {recentSurahsWithDetails.map((surah) => (
                  <div
                    key={surah.number}
                    onClick={() => handleSurahClick(surah.number)}
                  >
                    <SurahCard
                      surah={surah}
                      onBookmark={handleBookmark}
                      isBookmarked={bookmarkedSurahs.includes(surah.number)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Surahs */}
        <Card className="border-awqaf-border-light">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-card-foreground font-comfortaa">
                Semua Surah
              </h3>
              <span className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                {filteredSurahs.length} surah
              </span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto mobile-scroll">
              {filteredSurahs.map((surah) => (
                <div
                  key={surah.number}
                  onClick={() => handleSurahClick(surah.number)}
                >
                  <SurahCard
                    surah={surah}
                    onBookmark={handleBookmark}
                    isBookmarked={bookmarkedSurahs.includes(surah.number)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
