"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  MessageCircle,
  AlertTriangle,
  User,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Navigasi disesuaikan untuk LegalAja
const navItems: NavItem[] = [
  {
    href: "/",
    label: "Beranda",
    icon: Home,
  },
  {
    href: "/chat",
    label: "Chat",
    icon: MessageCircle,
  },
  {
    href: "/bantuan-darurat",
    label: "Bantuan",
    icon: AlertTriangle,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    // Tema disesuaikan: border-gray-200
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-gray-200 safe-area-pb">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md"></div>

      {/* Navigation content */}
      <div className="relative flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1
                ${
                  isActive
                    ? "bg-blue-100 text-blue-700" // Warna aktif: biru
                    : "text-gray-500 hover:text-blue-700 hover:bg-blue-50" // Warna non-aktif: abu-abu
                }
              `}
            >
              {/* Icon container */}
              <div
                className={`
                relative flex items-center justify-center w-8 h-8 mb-1 transition-all duration-200
                ${isActive ? "scale-110" : "scale-100"}
              `}
              >
                <Icon
                  className={`
                    w-5 h-5 transition-all duration-200
                    ${
                      isActive
                        ? "text-blue-700" // Warna ikon aktif
                        : "text-gray-500" // Warna ikon non-aktif
                    }
                  `}
                />

                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-700 rounded-full animate-pulse"></div> // Warna dot aktif
                )}
              </div>

              {/* Label */}
              <span
                className={`
                text-xs font-medium transition-all duration-200 text-center leading-tight
                ${
                  isActive
                    ? "text-blue-700 font-semibold" // Warna label aktif
                    : "text-gray-500" // Warna label non-aktif
                }
              `}
              >
                {item.label}
              </span>

              {/* Active background highlight */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-blue-200/20 to-transparent rounded-xl pointer-events-none"></div> // Warna gradien aktif
              )}
            </Link>
          );
        })}
      </div>

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div> {/* Warna border atas */}
    </nav>
  );
}