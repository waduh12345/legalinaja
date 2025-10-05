"use client";

import { useState, useEffect } from "react";

interface HijriDate {
  day: number;
  month: string;
  year: number;
  monthNumber: number;
}

export default function HijriDate() {
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);

  useEffect(() => {
    // Simple hijri date calculation (approximate)
    const gregorianDate = new Date();
    const hijriYear = Math.floor((gregorianDate.getFullYear() - 622) * 1.03);
    const hijriMonth = Math.floor((gregorianDate.getMonth() + 1) * 0.97);
    const hijriDay = Math.floor(gregorianDate.getDate() * 0.97);

    const hijriMonths = [
      "Muharram",
      "Safar",
      "Rabi' al-awwal",
      "Rabi' al-thani",
      "Jumada al-awwal",
      "Jumada al-thani",
      "Rajab",
      "Sha'ban",
      "Ramadan",
      "Shawwal",
      "Dhu al-Qi'dah",
      "Dhu al-Hijjah",
    ];

    setHijriDate({
      day: Math.max(1, hijriDay),
      month: hijriMonths[Math.max(0, hijriMonth - 1)],
      year: hijriYear,
      monthNumber: hijriMonth,
    });
  }, []);

  if (!hijriDate) {
    return (
      <div className="text-xs text-awqaf-foreground-secondary font-comfortaa">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-xs text-awqaf-foreground-secondary font-comfortaa">
      <div className="font-tajawal text-awqaf-primary">
        {hijriDate.day} {hijriDate.month} {hijriDate.year} H
      </div>
    </div>
  );
}
