"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Bookmark, BookmarkCheck, Clock } from "lucide-react";
import Link from "next/link";

interface Surah {
  number: number;
  name: string;
  arabic: string;
  verses: number;
  juz: number;
  revelation: "Meccan" | "Medinan";
  lastRead?: string;
}

interface SurahCardProps {
  surah: Surah;
  onBookmark: (surahNumber: number) => void;
  isBookmarked: boolean;
}

export default function SurahCard({ surah, onBookmark, isBookmarked }: SurahCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmark(surah.number);
  };

  return (
    <Link href={`/quran/${surah.number}`}>
      <Card 
        className="border-awqaf-border-light hover:shadow-md transition-all duration-200 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              {/* Surah Number */}
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-awqaf-primary font-bold font-comfortaa text-lg">
                  {surah.number}
                </span>
              </div>

              {/* Surah Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-card-foreground font-comfortaa text-lg truncate">
                    {surah.name}
                  </h3>
                  <span className="text-xs bg-accent-200 text-awqaf-primary px-2 py-1 rounded-full font-comfortaa">
                    Juz {surah.juz}
                  </span>
                </div>
                
                <p className="text-awqaf-primary font-tajawal text-lg mb-1">
                  {surah.arabic}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-awqaf-foreground-secondary font-comfortaa">
                  <span>{surah.verses} ayat</span>
                  <span className={`px-2 py-1 rounded-full ${
                    surah.revelation === "Meccan" 
                      ? "bg-accent-100 text-awqaf-primary" 
                      : "bg-info/20 text-info"
                  }`}>
                    {surah.revelation === "Meccan" ? "Makkiyah" : "Madaniyah"}
                  </span>
                </div>

                {surah.lastRead && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-awqaf-foreground-secondary font-comfortaa">
                    <Clock className="w-3 h-3" />
                    <span>{surah.lastRead}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bookmark Button */}
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 rounded-full hover:bg-accent-100 transition-colors duration-200"
              onClick={handleBookmarkClick}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-awqaf-primary" />
              ) : (
                <Bookmark className="w-5 h-5 text-awqaf-foreground-secondary hover:text-awqaf-primary transition-colors duration-200" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
