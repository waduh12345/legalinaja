"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Pastikan Anda memiliki utility cn

interface AppLoaderProps {
  onLoadComplete?: () => void;
  minLoadTime?: number; // Minimum loading time in milliseconds
}

export default function AppLoader({
  onLoadComplete,
  minLoadTime = 2000,
}: AppLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Memuat aplikasi...");

  useEffect(() => {
    const startTime = Date.now();

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Update loading text based on progress
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        if (progress < 30) return "Memuat data hukum...";
        if (progress < 60) return "Menyiapkan fitur konsultasi...";
        if (progress < 90) return "Hampir selesai...";
        return "Siap membantu Anda!";
      });
    }, 500);

    // Ensure minimum loading time
    const minTimePromise = new Promise((resolve) => {
      setTimeout(resolve, minLoadTime);
    });

    // Wait for both progress completion and minimum time
    Promise.all([
      new Promise((resolve) => {
        const checkProgress = () => {
          if (progress >= 100) {
            resolve(true);
          } else {
            setTimeout(checkProgress, 100);
          }
        };
        checkProgress();
      }),
      minTimePromise,
    ]).then(() => {
      clearInterval(progressInterval);
      clearInterval(textInterval);

      // Fade out animation
      setTimeout(() => {
        setIsVisible(false);
        onLoadComplete?.();
      }, 500);
    });

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoadComplete, minLoadTime, progress]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500",
        "bg-gradient-to-br from-blue-50 to-indigo-50", // Warna LegalAja
        !isVisible ? "opacity-0" : "opacity-100" // Kontrol fade-out
      )}
    >
      {/* Background Pattern - Disesuaikan */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white/50 to-indigo-50 mix-blend-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 max-w-sm mx-auto animate-fade-in-up">
        {/* Logo Container */}
        <div className="relative mb-6 animate-scale-in">
          {/* Logo Background Glow - Disesuaikan */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-300 rounded-full blur-xl opacity-30 scale-110 animate-pulse-glow"></div>

          {/* Logo */}
          <div className="relative w-28 h-28 bg-white rounded-full shadow-lg border-4 border-blue-100 flex items-center justify-center animate-float">
            <Image
              src="/logo-legal-app.webp" // Memastikan nama logo benar
              alt="LegalAja Logo"
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
              priority
            />
          </div>

          {/* Rotating Ring - Disesuaikan */}
          <div className="absolute inset-0 w-28 h-28 border-4 border-transparent border-t-blue-500 rounded-full animate-rotate-slow"></div>
        </div>

        {/* App Name */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 tracking-tight mb-2 font-sans">
            LegalAja
          </h1>
          <p className="text-sm text-gray-600 font-sans">
            Aplikasi Solusi Hukum Terpercaya
          </p>
        </div>

        {/* Loading Progress */}
        <div className="w-full max-w-xs mb-6">
          {/* Progress Bar - Disesuaikan */}
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>

          {/* Progress Text - Disesuaikan */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500 font-sans">
              {loadingText}
            </span>
            <span className="text-xs font-semibold text-blue-700 font-sans">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading Dots Animation - Disesuaikan */}
        <div className="flex space-x-2 mb-6">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: "1s",
              }}
            ></div>
          ))}
        </div>

        {/* App Version - Disesuaikan */}
        <div className="text-center">
          <p className="text-xs text-gray-400 font-sans">Versi 1.0.0</p>
          <p className="text-xs text-gray-400 font-sans mt-1">
            Dibuat dengan ❤️ untuk Masyarakat Indonesia
          </p>
        </div>
      </div>
    </div>
  );
}