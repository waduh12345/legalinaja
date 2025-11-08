"use client";

import { usePathname } from "next/navigation";
import BottomNavigation from "./BottomNavigation";
import React from "react";

// Tentukan halaman-halaman di mana BottomNavigation TIDAK boleh muncul
const AUTH_PAGES = [
  "/login",
  "/register",
  "/lupa-password",
  "/verifikasi-email",
];

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Cek apakah halaman saat ini adalah salah satu dari halaman auth
  // Kita menggunakan startsWith untuk menangani jika ada sub-path (misal /login/mitra)
  const showNav = !AUTH_PAGES.some((path) => pathname.startsWith(path));

  return (
    <>
      {children}
      {/* Hanya tampilkan BottomNavigation jika showNav adalah true */}
      {showNav && <BottomNavigation />}
    </>
  );
}