"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
        if (progress < 30) return "Memuat aplikasi...";
        if (progress < 60) return "Menyiapkan fitur...";
        if (progress < 90) return "Hampir selesai...";
        return "Siap digunakan!";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-accent-50 to-accent-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--accent)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 max-w-sm mx-auto animate-fade-in-up">
        {/* Logo Container */}
        <div className="relative mb-6 animate-scale-in">
          {/* Logo Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-200 to-accent-300 rounded-full blur-xl opacity-30 scale-110 animate-pulse-glow"></div>

          {/* Logo */}
          <div className="relative w-24 h-24 bg-white rounded-full shadow-lg border-4 border-accent-100 flex items-center justify-center animate-float">
            <Image
              src="/ibadahapp-logo.png"
              alt="IbadahApp Logo"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
              priority
            />
          </div>

          {/* Rotating Ring */}
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-accent-500 rounded-full animate-rotate-slow"></div>
        </div>

        {/* App Name */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-awqaf-primary font-comfortaa mb-2">
            IbadahApp
          </h1>
          <p className="text-sm text-awqaf-foreground-secondary font-comfortaa">
            Aplikasi Ibadah Muslim
          </p>
        </div>

        {/* Loading Progress */}
        <div className="w-full max-w-xs mb-6">
          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-accent-100 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-500 to-accent-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>

          {/* Progress Text */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-awqaf-foreground-secondary font-comfortaa">
              {loadingText}
            </span>
            <span className="text-xs font-semibold text-awqaf-primary font-comfortaa">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading Dots Animation */}
        <div className="flex space-x-2 mb-6">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 bg-accent-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: "1s",
              }}
            ></div>
          ))}
        </div>

        {/* App Version */}
        <div className="text-center">
          <p className="text-xs text-awqaf-foreground-tertiary font-comfortaa">
            Versi 1.0.0
          </p>
          <p className="text-xs text-awqaf-foreground-tertiary font-comfortaa mt-1">
            Dibuat dengan ❤️ untuk umat Muslim
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-accent-200 rounded-full opacity-20"></div>
        <div className="absolute top-8 right-6 w-6 h-6 border-2 border-accent-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-8 left-6 w-4 h-4 border-2 border-accent-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-accent-300 rounded-full opacity-20"></div>
      </div>

      {/* Fade Out Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-accent-50 to-accent-100 transition-opacity duration-500 ${
          !isVisible ? "opacity-0" : "opacity-100"
        }`}
      ></div>
    </div>
  );
}
