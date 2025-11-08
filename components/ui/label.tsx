"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// 1. Definisikan gaya default untuk label menggunakan `cva`.
// Ini adalah gaya yang saya gunakan di halaman login (profesional dan bersih).
// - `peer-disabled` adalah fitur aksesibilitas yang hebat:
//   Label ini akan otomatis meredup jika input yang terkait dengannya di-disable.
const labelVariants = cva(
  "text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

// 2. Buat komponen Label menggunakan Radix UI Primitive dan React.forwardRef
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    // 3. Gabungkan gaya default dari `cva` dengan `className` kustom
    //    yang mungkin Anda teruskan sebagai prop.
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }