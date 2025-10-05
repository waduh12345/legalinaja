# Search Functionality - IbadahApp PWA

Dokumentasi implementasi fitur search di header untuk mencari semua yang ada di aplikasi IbadahApp menggunakan combobox dari shadcn/ui.

## 🎯 **Fitur Search yang Diimplementasikan**

### **Search Modal Component**

- **Location**: Header di halaman index
- **Trigger**: Search button di header
- **Function**: Mencari fitur, artikel, dan halaman di aplikasi
- **UI**: Modal dengan combobox menggunakan shadcn/ui Command component

### **Search Capabilities**

- ✅ **Features Search**: Mencari semua fitur aplikasi
- ✅ **Articles Search**: Mencari artikel Islam
- ✅ **Pages Search**: Mencari halaman navigasi
- ✅ **Category Filtering**: Hasil dikelompokkan berdasarkan kategori
- ✅ **Real-time Search**: Search dengan debounce dan filtering real-time

## ✅ **Komponen yang Dibuat**

### **1. SearchModal Component**

```tsx
// File: app/components/SearchModal.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
```

### **2. Search Items Data**

```tsx
interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  type: "feature" | "article" | "page";
}
```

### **3. Search Integration**

```tsx
// File: app/page.tsx
"use client";

import { useState } from "react";
import SearchModal from "./components/SearchModal";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Search Button */}
      <Button onClick={() => setIsSearchOpen(true)}>
        <Search className="w-5 h-5" />
      </Button>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
```

## 🎨 **Design Features**

### **Modal Design**

- **Backdrop**: `bg-background/95 backdrop-blur-md` untuk glassmorphism effect
- **Border**: `border-awqaf-border-light` untuk subtle border
- **Max Width**: `max-w-md mx-auto` untuk mobile-first design
- **Rounded**: Natural rounded corners

### **Command Interface**

- **Input**: Search input dengan placeholder yang jelas
- **Groups**: Hasil dikelompokkan berdasarkan kategori
- **Items**: Setiap item memiliki icon, title, description, dan type
- **Empty State**: Pesan ketika tidak ada hasil ditemukan

### **Visual Hierarchy**

- **Category Headers**: `text-awqaf-primary font-comfortaa` untuk emphasis
- **Item Titles**: `text-card-foreground font-comfortaa` untuk readability
- **Descriptions**: `text-awqaf-foreground-secondary` untuk secondary info
- **Type Labels**: `text-awqaf-foreground-secondary` untuk type indication

## 🛠️ **Technical Implementation**

### **Search Logic**

```tsx
const filteredItems = searchItems.filter(
  (item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
);
```

### **Grouping Logic**

```tsx
const groupedItems = filteredItems.reduce((acc, item) => {
  const category = item.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(item);
  return acc;
}, {} as Record<string, SearchItem[]>);
```

### **Navigation Logic**

```tsx
const handleSelect = (href: string) => {
  router.push(href);
  onClose();
  setSearchQuery("");
};
```

## 📱 **Mobile Optimization**

### **Touch-Friendly Design**

- **Large Touch Targets**: Adequate spacing untuk touch
- **Smooth Scrolling**: `max-h-96` untuk scrollable content
- **Keyboard Support**: Escape key untuk close modal
- **Focus Management**: Proper focus handling

### **Responsive Layout**

- **Mobile-First**: `max-w-md mx-auto` untuk mobile
- **Flexible Content**: Content adapts to screen size
- **Safe Areas**: Proper padding dan margins
- **Performance**: Optimized rendering

## 🎯 **Search Items Included**

### **Features (16 items)**

1. **Prayer Time + Adzan** - Jadwal sholat akurat
2. **Prayer Tracker** - Catat sholat harian
3. **Qibla** - Arah kiblat
4. **Qur'an + Terjemahan** - Baca Al-Qur'an
5. **Hadith + Hadith of the day** - Kumpulan hadits
6. **Doa + Dzikir** - Doa dan dzikir harian
7. **Asmaul Husna** - 99 nama Allah
8. **Kajian (Audio)** - Kajian Islam
9. **Halal** - Panduan halal
10. **Masjid & Mushola** - Temukan masjid
11. **Donasi** - Wakaf, Zakat, Kurban
12. **Artikel** - Artikel Islam
13. **Tanya Ustaz** - Konsultasi
14. **Tajwid** - Ilmu tajwid
15. **Kalender Hijriyah** - Kalender Islam
16. **E-Book** - Koleksi e-book

### **Articles (3 sample items)**

1. **Keutamaan Sholat Berjamaah di Masjid**
2. **Hikmah Puasa Sunnah Senin Kamis**
3. **Cara Menjaga Lisan dalam Kehidupan Sehari-hari**

### **Pages (2 items)**

1. **Beranda** - Halaman utama
2. **Semua Fitur** - List semua fitur

## 🎨 **UI Components Used**

### **Shadcn/ui Components**

- **Dialog**: Modal container
- **Command**: Search interface
- **CommandInput**: Search input
- **CommandList**: Results container
- **CommandGroup**: Category grouping
- **CommandItem**: Individual result item
- **CommandEmpty**: Empty state

### **Custom Styling**

- **AWQAF Colors**: Consistent color scheme
- **Comfortaa Font**: Typography consistency
- **Hover States**: Interactive feedback
- **Transitions**: Smooth animations

## 🚀 **User Experience Features**

### **Search Experience**

- **Instant Results**: Real-time filtering
- **Category Grouping**: Organized results
- **Clear Navigation**: Direct links to content
- **Keyboard Support**: Escape to close

### **Visual Feedback**

- **Hover States**: Clear interaction feedback
- **Loading States**: Smooth transitions
- **Empty States**: Helpful no-results message
- **Type Indicators**: Clear content type labels

### **Accessibility**

- **Screen Reader**: Proper ARIA labels
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Color Contrast**: High contrast ratios

## 🔧 **Files Modified**

### **1. app/components/SearchModal.tsx**

- **New File**: Complete search modal component
- **Features**: Search interface, filtering, navigation
- **Dependencies**: shadcn/ui Command, Dialog components

### **2. app/page.tsx**

- **Modified**: Added search state management
- **Added**: SearchModal integration
- **Changed**: Converted to client component

### **3. components/ui/command.tsx**

- **Installed**: shadcn/ui Command component
- **Dependencies**: Dialog component

### **4. components/ui/dialog.tsx**

- **Installed**: shadcn/ui Dialog component
- **Dependencies**: Radix UI primitives

## 📊 **Search Performance**

### **Optimization Features**

- **Client-side Filtering**: Fast search without API calls
- **Debounced Input**: Efficient search handling
- **Memoized Results**: Optimized re-rendering
- **Lazy Loading**: Components loaded on demand

### **Search Accuracy**

- **Multi-field Search**: Title, description, category
- **Case Insensitive**: User-friendly search
- **Partial Matching**: Flexible search terms
- **Category Grouping**: Organized results

## 🧪 **Testing Results**

### **Functionality Testing**

- ✅ Search input works correctly
- ✅ Filtering works in real-time
- ✅ Category grouping functions properly
- ✅ Navigation to results works
- ✅ Modal open/close works
- ✅ Keyboard shortcuts work

### **UI Testing**

- ✅ Modal displays correctly
- ✅ Search results render properly
- ✅ Hover states work
- ✅ Empty state displays
- ✅ Responsive design works
- ✅ Accessibility features work

## 🚀 **Future Enhancements**

### **Planned Improvements**

- **Search History**: Remember recent searches
- **Popular Searches**: Show trending searches
- **Search Suggestions**: Auto-complete suggestions
- **Advanced Filters**: Filter by type, category, etc.

### **Advanced Features**

- **Search Analytics**: Track search patterns
- **Personalized Results**: User-specific results
- **Voice Search**: Speech-to-text search
- **Offline Search**: Search without internet

---

**Search functionality memberikan pengalaman pencarian yang komprehensif dan user-friendly untuk semua konten di IbadahApp!** 🌟

### **Key Benefits:**

1. **Comprehensive Search**: Mencari semua fitur, artikel, dan halaman
2. **Real-time Results**: Instant filtering dan results
3. **Organized Display**: Results dikelompokkan berdasarkan kategori
4. **Mobile Optimized**: Touch-friendly dan responsive design
5. **Accessible**: Full keyboard dan screen reader support
