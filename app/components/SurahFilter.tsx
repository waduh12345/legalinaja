"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, X } from "lucide-react";

interface SurahFilterProps {
  selectedJuz: number | null;
  onJuzChange: (juz: number | null) => void;
  selectedRevelation: "all" | "Meccan" | "Medinan";
  onRevelationChange: (revelation: "all" | "Meccan" | "Medinan") => void;
}

export default function SurahFilter({
  selectedJuz,
  onJuzChange,
  selectedRevelation,
  onRevelationChange,
}: SurahFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const juzOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between border-awqaf-border-light hover:bg-accent-50 font-comfortaa"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span>Filter Surah</span>
        </div>
        {isOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <span className="text-xs bg-accent-100 text-awqaf-primary px-2 py-1 rounded-full">
            {selectedJuz || selectedRevelation !== "all" ? "Aktif" : ""}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-20 border-awqaf-border-light shadow-lg">
          <CardContent className="p-4 space-y-4">
            {/* Juz Filter */}
            <div>
              <h4 className="font-semibold text-card-foreground font-comfortaa mb-2">
                Juz
              </h4>
              <div className="grid grid-cols-5 gap-2">
                <Button
                  variant={selectedJuz === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => onJuzChange(null)}
                  className="text-xs font-comfortaa"
                >
                  Semua
                </Button>
                {juzOptions.map((juz) => (
                  <Button
                    key={juz}
                    variant={selectedJuz === juz ? "default" : "outline"}
                    size="sm"
                    onClick={() => onJuzChange(juz)}
                    className="text-xs font-comfortaa"
                  >
                    {juz}
                  </Button>
                ))}
              </div>
            </div>

            {/* Revelation Filter */}
            <div>
              <h4 className="font-semibold text-card-foreground font-comfortaa mb-2">
                Tempat Turun
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={selectedRevelation === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onRevelationChange("all")}
                  className="text-xs font-comfortaa"
                >
                  Semua
                </Button>
                <Button
                  variant={selectedRevelation === "Meccan" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onRevelationChange("Meccan")}
                  className="text-xs font-comfortaa"
                >
                  Makkiyah
                </Button>
                <Button
                  variant={selectedRevelation === "Medinan" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onRevelationChange("Medinan")}
                  className="text-xs font-comfortaa"
                >
                  Madaniyah
                </Button>
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedJuz !== null || selectedRevelation !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onJuzChange(null);
                  onRevelationChange("all");
                }}
                className="w-full text-awqaf-foreground-secondary hover:text-awqaf-primary font-comfortaa"
              >
                Hapus Filter
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
