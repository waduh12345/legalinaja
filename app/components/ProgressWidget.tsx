"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Target } from "lucide-react";

interface ProgressData {
  prayer: {
    completed: number;
    total: number;
    percentage: number;
  };
  quran: {
    pagesRead: number;
    totalPages: number;
    percentage: number;
  };
}

export default function ProgressWidget() {
  // Sample progress data
  const progressData: ProgressData = {
    prayer: {
      completed: 3,
      total: 5,
      percentage: 60,
    },
    quran: {
      pagesRead: 12,
      totalPages: 30,
      percentage: 40,
    },
  };

  return (
    <Card className="border-awqaf-border-light hover:shadow-md transition-all duration-200 col-span-2">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
            <Target className="w-4 h-4 text-awqaf-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground text-sm font-comfortaa">
              Progress Hari Ini
            </h3>
            <p className="text-xs text-awqaf-foreground-secondary font-comfortaa">
              Target ibadah harian
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Prayer Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-awqaf-primary" />
                <span className="text-sm font-medium text-card-foreground font-comfortaa">
                  Sholat
                </span>
              </div>
              <span className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                {progressData.prayer.completed}/{progressData.prayer.total}
              </span>
            </div>
            <Progress
              value={progressData.prayer.percentage}
              className="h-2 bg-accent-100"
            />
            <div className="flex justify-between text-xs text-awqaf-foreground-secondary font-comfortaa">
              <span>0%</span>
              <span className="font-medium text-awqaf-primary">
                {progressData.prayer.percentage}%
              </span>
              <span>100%</span>
            </div>
          </div>

          {/* Quran Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-info" />
                <span className="text-sm font-medium text-card-foreground font-comfortaa">
                  Al-Qur'an
                </span>
              </div>
              <span className="text-sm text-awqaf-foreground-secondary font-comfortaa">
                {progressData.quran.pagesRead}/{progressData.quran.totalPages}{" "}
                halaman
              </span>
            </div>
            <Progress
              value={progressData.quran.percentage}
              className="h-2 bg-accent-100"
            />
            <div className="flex justify-between text-xs text-awqaf-foreground-secondary font-comfortaa">
              <span>0%</span>
              <span className="font-medium text-info">
                {progressData.quran.percentage}%
              </span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-4 p-3 bg-accent-50 rounded-lg border border-accent-100">
          <p className="text-xs text-awqaf-foreground-secondary font-comfortaa text-center">
            "Barangsiapa yang mengerjakan amal saleh, baik laki-laki maupun
            perempuan dalam keadaan beriman, maka sesungguhnya akan Kami berikan
            kepadanya kehidupan yang baik"
          </p>
          <p className="text-xs text-awqaf-primary font-tajawal text-center mt-1">
            - QS. An-Nahl: 97
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
