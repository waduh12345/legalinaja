"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  BookOpen,
  Search,
  Calendar,
  Heart,
  Share2,
  Copy,
  CheckCircle,
  Navigation,
  RefreshCw,
  User,
  Home,
  BookMarked,
  Users,
  GraduationCap,
  Smile,
} from "lucide-react";
import Link from "next/link";

interface Hadith {
  id: string;
  arabic: string;
  translation: string;
  narrator: string;
  source: string;
  category: string;
  grade: "sahih" | "hasan" | "daif";
  book: string;
  chapter?: string;
  number?: string;
  isFavorite?: boolean;
}

interface HadithCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

const hadithCategories: HadithCategory[] = [
  {
    id: "daily",
    name: "Hadist Harian",
    description: "Hadist pilihan untuk motivasi harian",
    icon: Calendar,
    count: 365,
  },
  {
    id: "faith",
    name: "Iman & Akidah",
    description: "Hadist tentang keimanan dan akidah",
    icon: Home,
    count: 150,
  },
  {
    id: "worship",
    name: "Ibadah",
    description: "Hadist tentang ibadah dan amal shalih",
    icon: BookMarked,
    count: 200,
  },
  {
    id: "character",
    name: "Akhlak",
    description: "Hadist tentang akhlak dan budi pekerti",
    icon: Smile,
    count: 180,
  },
  {
    id: "family",
    name: "Keluarga",
    description: "Hadist tentang keluarga dan rumah tangga",
    icon: Users,
    count: 120,
  },
  {
    id: "knowledge",
    name: "Ilmu & Pendidikan",
    description: "Hadist tentang menuntut ilmu",
    icon: GraduationCap,
    count: 80,
  },
];

const sampleHadiths: Hadith[] = [
  {
    id: "1",
    arabic:
      "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    translation:
      "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah dia berkata baik atau diam.",
    narrator: "Abu Hurairah",
    source: "HR. Bukhari dan Muslim",
    category: "character",
    grade: "sahih",
    book: "Shahih Bukhari",
    chapter: "Adab",
    number: "6018",
  },
  {
    id: "2",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    translation: "Sesungguhnya amal perbuatan itu tergantung pada niatnya.",
    narrator: "Umar bin Khattab",
    source: "HR. Bukhari dan Muslim",
    category: "faith",
    grade: "sahih",
    book: "Shahih Bukhari",
    chapter: "Bad'ul Wahyi",
    number: "1",
  },
  {
    id: "3",
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    translation: "Menuntut ilmu adalah kewajiban bagi setiap muslim.",
    narrator: "Anas bin Malik",
    source: "HR. Ibnu Majah",
    category: "knowledge",
    grade: "hasan",
    book: "Sunan Ibnu Majah",
    chapter: "Muqaddimah",
    number: "224",
  },
  {
    id: "4",
    arabic: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا",
    translation:
      "Seorang mukmin terhadap mukmin yang lain bagaikan satu bangunan, sebagian menguatkan sebagian yang lain.",
    narrator: "Abu Musa Al-Asy'ari",
    source: "HR. Bukhari dan Muslim",
    category: "character",
    grade: "sahih",
    book: "Shahih Muslim",
    chapter: "Al-Birr",
    number: "2585",
  },
  {
    id: "5",
    arabic: "مَنْ لَا يَرْحَمُ النَّاسَ لَا يَرْحَمُهُ اللَّهُ",
    translation:
      "Barangsiapa tidak menyayangi manusia, Allah tidak akan menyayanginya.",
    narrator: "Jarir bin Abdullah",
    source: "HR. Bukhari dan Muslim",
    category: "character",
    grade: "sahih",
    book: "Shahih Bukhari",
    chapter: "At-Tauhid",
    number: "7376",
  },
  {
    id: "6",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translation:
      "Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya.",
    narrator: "Utsman bin Affan",
    source: "HR. Bukhari",
    category: "knowledge",
    grade: "sahih",
    book: "Shahih Bukhari",
    chapter: "Fadha'il Al-Qur'an",
    number: "5027",
  },
  {
    id: "7",
    arabic: "الصَّبْرُ نِصْفُ الإِيمَانِ",
    translation: "Sabar adalah separuh dari iman.",
    narrator: "Abu Malik Al-Asy'ari",
    source: "HR. Abu Dawud",
    category: "faith",
    grade: "hasan",
    book: "Sunan Abu Dawud",
    chapter: "As-Sunnah",
    number: "4696",
  },
  {
    id: "8",
    arabic: "مَنْ صَلَّى الصُّبْحَ فَهُوَ فِي ذِمَّةِ اللَّهِ",
    translation:
      "Barangsiapa shalat subuh, maka dia berada dalam perlindungan Allah.",
    narrator: "Jundub bin Abdullah",
    source: "HR. Muslim",
    category: "worship",
    grade: "sahih",
    book: "Shahih Muslim",
    chapter: "Al-Masajid",
    number: "657",
  },
];

export default function HadithPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hadithOfTheDay, setHadithOfTheDay] = useState<Hadith | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGrades, setSelectedGrades] = useState<Set<Hadith["grade"]>>(
    new Set()
  );
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const uniqueBooks = useMemo(() => {
    return Array.from(new Set(sampleHadiths.map((h) => h.book)));
  }, []);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("hadith-favorites");
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("hadith-favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  // Generate hadith of the day based on current date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const hadithIndex = dayOfYear % sampleHadiths.length;
    setHadithOfTheDay(sampleHadiths[hadithIndex]);
  }, []);

  // Filter hadiths based on search and category
  const filteredHadiths = useMemo(() => {
    let filtered = sampleHadiths;

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (hadith) =>
          hadith.arabic.toLowerCase().includes(q) ||
          hadith.translation.toLowerCase().includes(q) ||
          hadith.narrator.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (hadith) => hadith.category === selectedCategory
      );
    }

    if (selectedGrades.size > 0) {
      filtered = filtered.filter((h) => selectedGrades.has(h.grade));
    }

    if (selectedBook) {
      filtered = filtered.filter((h) => h.book === selectedBook);
    }

    return filtered;
  }, [debouncedQuery, selectedCategory, selectedGrades, selectedBook]);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedGrades(new Set());
    setSelectedBook(null);
    setSearchQuery("");
  };

  const handleToggleFavorite = (hadithId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(hadithId)) {
        newFavorites.delete(hadithId);
      } else {
        newFavorites.add(hadithId);
      }
      return newFavorites;
    });
  };

  const handleCopyHadith = async (hadith: Hadith) => {
    const text = `${hadith.arabic}\n\n${hadith.translation}\n\n- ${hadith.narrator}\n${hadith.source}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(hadith.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShareHadith = async (hadith: Hadith) => {
    const text = `${hadith.arabic}\n\n${hadith.translation}\n\n- ${hadith.narrator}\n${hadith.source}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Hadist Pilihan",
          text: text,
        });
      } catch (err) {
        console.error("Failed to share:", err);
      }
    } else {
      // Fallback to copy
      handleCopyHadith(hadith);
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "sahih":
        return "bg-green-100 text-green-800";
      case "hasan":
        return "bg-yellow-100 text-yellow-800";
      case "daif":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGradeText = (grade: string) => {
    switch (grade) {
      case "sahih":
        return "Shahih";
      case "hasan":
        return "Hasan";
      case "daif":
        return "Dhaif";
      default:
        return "Tidak diketahui";
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return hadithCategories.find((cat) => cat.id === categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="relative bg-background/90 backdrop-blur-md rounded-2xl border border-awqaf-border-light/50 shadow-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full hover:bg-accent-100 hover:text-awqaf-primary transition-colors duration-200"
                >
                  <Navigation className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-lg font-bold text-awqaf-primary font-comfortaa">
                Hadist & Sunnah
              </h1>
              <div className="w-10 h-10"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Hadith of the Day */}
        {hadithOfTheDay && (
          <Card className="border-awqaf-border-light bg-gradient-to-r from-accent-100 to-accent-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-comfortaa flex items-center gap-2">
                <Calendar className="w-5 h-5 text-awqaf-primary" />
                Hadist Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/80 p-4 rounded-lg">
                <p className="text-lg font-tajawal text-awqaf-primary text-center leading-relaxed mb-4">
                  {hadithOfTheDay.arabic}
                </p>
                <p className="text-sm text-awqaf-foreground-secondary font-comfortaa text-center leading-relaxed">
                  {hadithOfTheDay.translation}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-awqaf-foreground-secondary font-comfortaa">
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3" />
                  <span>{hadithOfTheDay.narrator}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3 h-3" />
                  <span>{hadithOfTheDay.source}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleFavorite(hadithOfTheDay.id)}
                  className="flex-1"
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${
                      favorites.has(hadithOfTheDay.id)
                        ? "fill-red-500 text-red-500"
                        : ""
                    }`}
                  />
                  {favorites.has(hadithOfTheDay.id)
                    ? "Favorit"
                    : "Tambah Favorit"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShareHadith(hadithOfTheDay)}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search + Sticky Chip Bar */}
        <Card className="border-awqaf-border-light sticky top-[68px] z-20">
          <CardContent className="p-3 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-awqaf-foreground-secondary" />
              <Input
                placeholder="Cari hadist, perawi, atau kitab..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-comfortaa"
              />
            </div>

            {/* Chips: Categories + quick grade */}
            <div className="flex gap-2 overflow-x-auto pb-1 mobile-scroll">
              {/* Categories */}
              {hadithCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )
                  }
                >
                  {category.name}
                </Button>
              ))}

              {/* Quick grades */}
              {(["sahih", "hasan", "daif"] as const).map((g) => (
                <Button
                  key={g}
                  variant={selectedGrades.has(g) ? "default" : "outline"}
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => {
                    setSelectedGrades((prev) => {
                      const next = new Set(prev);
                      if (next.has(g)) {
                        next.delete(g);
                      } else {
                        next.add(g);
                      }
                      return next;
                    });
                  }}
                >
                  {g === "sahih" ? "Shahih" : g === "hasan" ? "Hasan" : "Dhaif"}
                </Button>
              ))}

              {/* Advanced filter drawer trigger */}
              <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    Filter Lanjutan
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="border-awqaf-border-light">
                  <DrawerHeader>
                    <DrawerTitle className="font-comfortaa">
                      Filter Lanjutan
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 space-y-4">
                    {/* Book filter */}
                    <div>
                      <p className="text-sm text-awqaf-foreground-secondary font-comfortaa mb-2">
                        Kitab
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {uniqueBooks.map((book) => (
                          <Button
                            key={book}
                            variant={
                              selectedBook === book ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setSelectedBook(
                                selectedBook === book ? null : book
                              )
                            }
                          >
                            {book}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Clear */}
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAllFilters}
                      >
                        Reset Semua Filter
                      </Button>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>

            {/* Active filter summary */}
            {(selectedCategory ||
              selectedGrades.size > 0 ||
              selectedBook ||
              debouncedQuery) && (
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {debouncedQuery && (
                    <Badge variant="secondary" className="text-xs">
                      Cari: “{debouncedQuery}”
                    </Badge>
                  )}
                  {selectedCategory && (
                    <Badge variant="secondary" className="text-xs">
                      {
                        hadithCategories.find((c) => c.id === selectedCategory)
                          ?.name
                      }
                    </Badge>
                  )}
                  {Array.from(selectedGrades).map((g) => (
                    <Badge key={g} variant="secondary" className="text-xs">
                      {g === "sahih"
                        ? "Shahih"
                        : g === "hasan"
                        ? "Hasan"
                        : "Dhaif"}
                    </Badge>
                  ))}
                  {selectedBook && (
                    <Badge variant="secondary" className="text-xs">
                      {selectedBook}
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  <RefreshCw className="w-4 h-4 mr-1" /> Reset
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories grid removed; replaced by sticky chip bar */}

        {/* Hadith List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-awqaf-primary font-comfortaa">
              {selectedCategory
                ? getCategoryInfo(selectedCategory)?.name
                : "Semua Hadist"}
            </h2>
            {selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="text-awqaf-foreground-secondary hover:text-awqaf-primary"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {filteredHadiths.map((hadith) => (
              <Card key={hadith.id} className="border-awqaf-border-light">
                <CardContent className="p-4 space-y-4">
                  {/* Arabic Text */}
                  <div className="bg-accent-50 p-4 rounded-lg">
                    <p className="text-lg font-tajawal text-awqaf-primary text-center leading-relaxed">
                      {hadith.arabic}
                    </p>
                  </div>

                  {/* Translation */}
                  <div>
                    <p className="text-sm text-awqaf-foreground-secondary font-comfortaa leading-relaxed">
                      {hadith.translation}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-awqaf-foreground-secondary font-comfortaa">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{hadith.narrator}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{hadith.source}</span>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getGradeColor(hadith.grade)}`}
                    >
                      {getGradeText(hadith.grade)}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleFavorite(hadith.id)}
                      className="flex-1"
                    >
                      <Heart
                        className={`w-4 h-4 mr-2 ${
                          favorites.has(hadith.id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                      {favorites.has(hadith.id) ? "Favorit" : "Favorit"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyHadith(hadith)}
                    >
                      {copiedId === hadith.id ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShareHadith(hadith)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHadiths.length === 0 && (
            <Card className="border-awqaf-border-light">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-awqaf-foreground-secondary mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground font-comfortaa mb-2">
                  Tidak ada hadist ditemukan
                </h3>
                <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                  Coba ubah kata kunci pencarian atau pilih kategori lain
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
