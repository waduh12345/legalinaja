"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Heart,
} from "lucide-react";
import Image from "next/image";

interface KajianItem {
  id: string;
  title: string;
  ustadz: string;
  date: string; // ISO
  audioUrl: string;
  preview: string;
}

const sampleKajian: KajianItem[] = [
  {
    id: "k1",
    title: "Keutamaan Sholat Berjamaah",
    ustadz: "Ust. Syafiq Riza Basalamah",
    date: "2024-05-01",
    audioUrl: "/audio/k1.mp3",
    preview:
      "Pembahasan tentang keutamaan sholat berjamaah, dalil-dalil, dan faedah praktisnya dalam kehidupan sehari-hari.",
  },
  {
    id: "k2",
    title: "Hikmah Puasa Sunnah",
    ustadz: "Ust. Abdul Hakim bin Amir Abdat",
    date: "2024-04-15",
    audioUrl: "/audio/k2.mp3",
    preview:
      "Ringkasan faedah puasa sunnah Senin-Kamis dan amalan-amalan terkait yang dianjurkan.",
  },
];

export default function KajianDetailPage() {
  const params = useParams();
  const router = useRouter();
  const kajianId = params.id as string;

  const kajian = useMemo(
    () => sampleKajian.find((k) => k.id === kajianId) || sampleKajian[0],
    [kajianId]
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [like, setLike] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = new Audio(kajian.audioUrl);
    audioRef.current = el;
    const onTime = () => setCurrentTime(el.currentTime);
    const onLoaded = () => setDuration(el.duration || 0);
    const onEnded = () => setIsPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("ended", onEnded);
    return () => {
      el.pause();
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("ended", onEnded);
    };
  }, [kajian.audioUrl]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play();
      setIsPlaying(true);
    }
  };

  const seekBy = (secs: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(duration || 0, el.currentTime + secs)
    );
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  const handleSeek = (value: number) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    const newTime = Math.max(0, Math.min(duration, value));
    el.currentTime = newTime;
    setCurrentTime(newTime);
  };

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
              <h1 className="text-lg font-bold text-awqaf-primary font-comfortaa text-center flex-1">
                Kajian Audio
              </h1>
              <div className="w-10 h-10" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Info */}
        <Card className="border-awqaf-border-light">
          <CardContent className="p-4 space-y-2">
            <h2 className="font-semibold text-card-foreground font-comfortaa">
              {kajian.title}
            </h2>
            <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
              {kajian.ustadz} •{" "}
              {new Date(kajian.date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
              {kajian.preview}
            </p>
          </CardContent>
        </Card>

        {/* Audio Player */}
        {/* Preview image banner */}

        <Card className="border-awqaf-border-light">
          <CardContent>
            <div className="rounded-xl overflow-hidden border border-awqaf-border-light mb-4">
              <Image
                unoptimized
                width={100}
                height={100}
                src="https://images.unsplash.com/photo-1700716137543-ef7d4d78c5f3?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Preview Kajian"
                className="w-full h-40 object-cover"
              />
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-awqaf-foreground-secondary font-comfortaa">
                {fmt(currentTime)} / {fmt(duration || 0)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLike((v) => !v)}
                className={`w-8 h-8 p-0 rounded-full ${
                  like ? "bg-red-100" : "bg-accent-100"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    like ? "text-red-500 fill-red-500" : "text-awqaf-primary"
                  }`}
                />
              </Button>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <input
                type="range"
                min={0}
                max={Math.max(0, Math.floor(duration || 0))}
                value={Math.floor(currentTime)}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="w-full accent-awqaf-primary"
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" size="sm" onClick={() => seekBy(-60)}>
                <RotateCcw className="w-4 h-4 mr-2" /> -1:00
              </Button>
              <Button variant="default" size="sm" onClick={togglePlay}>
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" /> Play
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={() => seekBy(60)}>
                <RotateCw className="w-4 h-4 mr-2" /> +1:00
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
