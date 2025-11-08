"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

// Menggunakan React.forwardRef untuk meneruskan ref
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    // Menggunakan cn untuk menggabungkan class default dengan class kustom
    className={cn(
      // 1. Styling dasar:
      // 'peer' penting agar <Label htmlFor> dapat mendeteksi state checked
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background",
      
      // 2. Styling saat 'focus-visible' (aksesibilitas keyboard)
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      
      // 3. Styling saat 'disabled'
      "disabled:cursor-not-allowed disabled:opacity-50",
      
      // 4. Styling saat 'data-[state=checked]' (dicentang)
      // Menggunakan warna brand biru yang konsisten
      "data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600",
      
      className
    )}
    {...props}
  >
    {/* Indikator (tanda centang) di dalam checkbox */}
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {/* Menggunakan ikon 'Check' dari lucide-react */}
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }