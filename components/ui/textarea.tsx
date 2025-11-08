"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// 1. Definisikan props untuk Textarea, extend dari React.ComponentProps<"textarea">
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// 2. Buat komponen Textarea menggunakan React.forwardRef
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        // 3. Gunakan cn untuk menggabungkan class default dengan class kustom
        className={cn(
          // Styling dasar (diadaptasi dari Input)
          "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "dark:bg-input/30",
          // Styling ukuran & layout (diubah untuk textarea)
          "flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs",
          "transition-[color,box-shadow] outline-none",
          // Styling disabled
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm",
          // Styling focus-visible (konsisten dengan Input)
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          // Styling aria-invalid (konsisten dengan Input)
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }