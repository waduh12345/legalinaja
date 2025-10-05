"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Share2,
  Settings,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Verse {
  number: number;
  arabic: string;
  translation: string;
  audio?: string;
}

interface Surah {
  number: number;
  name: string;
  arabic: string;
  verseCount: number;
  juz: number;
  revelation: "Meccan" | "Medinan";
  verses: Verse[];
}

export default function SurahDetailPage() {
  const params = useParams();
  const router = useRouter();
  const surahNumber = parseInt(params.number as string);

  const [surah, setSurah] = useState<Surah | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState<number | null>(null);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<number[]>([]);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [showTranslation, setShowTranslation] = useState(true);

  // Sample surah data (in real app, this would come from an API)
  const sampleSurah: Surah = useMemo(
    () => ({
      number: 1,
      name: "Al-Fatihah",
      arabic: "الفاتحة",
      verseCount: 7,
      juz: 1,
      revelation: "Meccan",
      verses: [
        {
          number: 1,
          arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
        },
        {
          number: 2,
          arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
          translation: "Segala puji bagi Allah, Tuhan seluruh alam.",
        },
        {
          number: 3,
          arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
          translation: "Yang Maha Pengasih, Maha Penyayang.",
        },
        {
          number: 4,
          arabic: "مَالِكِ يَوْمِ الدِّينِ",
          translation: "Pemilik hari pembalasan.",
        },
        {
          number: 5,
          arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
          translation:
            "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan.",
        },
        {
          number: 6,
          arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
          translation: "Tunjukilah kami jalan yang lurus.",
        },
        {
          number: 7,
          arabic:
            "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
          translation:
            "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat.",
        },
      ],
    }),
    []
  );

  // Load bookmarked verses from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem(
      `quran-verse-bookmarks-${surahNumber}`
    );
    if (savedBookmarks) {
      setBookmarkedVerses(JSON.parse(savedBookmarks));
    }
  }, [surahNumber]);

  // Set sample surah data
  useEffect(() => {
    setSurah(sampleSurah);
  }, [surahNumber, sampleSurah]);

  // Handle audio playback
  const handlePlayPause = (verseNumber: number) => {
    if (isPlaying && currentVerse === verseNumber) {
      setIsPlaying(false);
      setCurrentVerse(null);
    } else {
      setIsPlaying(true);
      setCurrentVerse(verseNumber);
      // In real app, play audio here
    }
  };

  // Handle verse bookmark
  const handleVerseBookmark = (verseNumber: number) => {
    const newBookmarks = bookmarkedVerses.includes(verseNumber)
      ? bookmarkedVerses.filter((num) => num !== verseNumber)
      : [...bookmarkedVerses, verseNumber];

    setBookmarkedVerses(newBookmarks);
    localStorage.setItem(
      `quran-verse-bookmarks-${surahNumber}`,
      JSON.stringify(newBookmarks)
    );
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Surah ${surah?.name}`,
          text: `Baca Surah ${surah?.name} di IbadahApp`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!surah) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Volume2 className="w-8 h-8 text-awqaf-primary animate-pulse" />
          </div>
          <p className="text-awqaf-foreground-secondary font-comfortaa">
            Memuat surah...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="relative bg-background/90 backdrop-blur-md rounded-2xl border border-awqaf-border-light/50 shadow-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="w-10 h-10 p-0 rounded-full hover:bg-accent-100 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-awqaf-primary" />
              </Button>

              <div className="text-center flex-1">
                <h1 className="text-lg font-bold text-awqaf-primary font-comfortaa">
                  {surah.name}
                </h1>
                <p className="text-sm text-awqaf-primary font-tajawal">
                  {surah.arabic}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="w-10 h-10 p-0 rounded-full hover:bg-accent-100 transition-colors duration-200"
                >
                  <Share2 className="w-5 h-5 text-awqaf-primary" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="w-10 h-10 p-0 rounded-full hover:bg-accent-100 transition-colors duration-200"
                >
                  <Settings className="w-5 h-5 text-awqaf-primary" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Surah Info */}
        <Card className="border-awqaf-border-light">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-awqaf-primary font-bold font-comfortaa text-lg">
                    {surah.number}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold text-card-foreground font-comfortaa text-lg">
                    {surah.name}
                  </h2>
                  <p className="text-awqaf-primary font-tajawal text-lg">
                    {surah.arabic}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePlayPause(1)}
                className="border-awqaf-border-light hover:bg-accent-100 font-comfortaa"
              >
                {isPlaying && currentVerse === 1 ? (
                  <Pause className="w-4 h-4 mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isPlaying && currentVerse === 1 ? "Pause" : "Play"}
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-awqaf-foreground-secondary font-comfortaa">
              <span>{surah.verseCount} ayat</span>
              <Badge
                variant="secondary"
                className="bg-accent-100 text-awqaf-primary"
              >
                Juz {surah.juz}
              </Badge>
              <Badge
                variant="secondary"
                className={
                  surah.revelation === "Meccan"
                    ? "bg-accent-100 text-awqaf-primary"
                    : "bg-info/20 text-info"
                }
              >
                {surah.revelation === "Meccan" ? "Makkiyah" : "Madaniyah"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Verses */}
        <div className="space-y-4">
          {surah.verses.map((verse) => (
            <Card key={verse.number} className="border-awqaf-border-light">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Verse Number */}
                  <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-awqaf-primary font-bold font-comfortaa text-sm">
                      {verse.number}
                    </span>
                  </div>

                  {/* Verse Content */}
                  <div className="flex-1 min-w-0">
                    {/* Arabic Text */}
                    <div className="mb-3">
                      <p
                        className={`text-awqaf-primary font-tajawal leading-relaxed ${
                          fontSize === "sm"
                            ? "text-lg"
                            : fontSize === "md"
                            ? "text-xl"
                            : "text-2xl"
                        }`}
                      >
                        {verse.arabic}
                      </p>
                    </div>

                    {/* Translation */}
                    {showTranslation && (
                      <div className="mb-3">
                        <p
                          className={`text-awqaf-foreground-secondary font-comfortaa leading-relaxed ${
                            fontSize === "sm"
                              ? "text-sm"
                              : fontSize === "md"
                              ? "text-base"
                              : "text-lg"
                          }`}
                        >
                          {verse.translation}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePlayPause(verse.number)}
                        className="h-8 px-2 text-awqaf-foreground-secondary hover:text-awqaf-primary hover:bg-accent-100 transition-colors duration-200"
                      >
                        {isPlaying && currentVerse === verse.number ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVerseBookmark(verse.number)}
                        className="h-8 px-2 text-awqaf-foreground-secondary hover:text-awqaf-primary hover:bg-accent-100 transition-colors duration-200"
                      >
                        {bookmarkedVerses.includes(verse.number) ? (
                          <BookmarkCheck className="w-4 h-4 text-awqaf-primary" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Settings Panel */}
        {showTranslation && (
          <Card className="border-awqaf-border-light">
            <CardContent className="p-4">
              <h3 className="font-semibold text-card-foreground font-comfortaa mb-3">
                Pengaturan
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-awqaf-foreground-secondary font-comfortaa mb-2 block">
                    Ukuran Font
                  </label>
                  <div className="flex gap-2">
                    {(["sm", "md", "lg"] as const).map((size) => (
                      <Button
                        key={size}
                        variant={fontSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFontSize(size)}
                        className="font-comfortaa"
                      >
                        {size === "sm"
                          ? "Kecil"
                          : size === "md"
                          ? "Sedang"
                          : "Besar"}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
