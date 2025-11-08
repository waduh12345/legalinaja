# Contoh Penggunaan Skema Warna AWQAF-inspired

Dokumentasi ini berisi contoh-contoh praktis penggunaan skema warna AWQAF-inspired dalam komponen LegalApp.

## 🎨 **Contoh Komponen dengan Skema Warna**

### **1. Card Component**

```tsx
// Menggunakan shadcn/ui Card dengan skema AWQAF
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PrayerCard() {
  return (
    <Card className="border-awqaf-light">
      <CardHeader>
        <CardTitle className="text-card-foreground font-comfortaa">
          Jadwal Sholat
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-awqaf-secondary font-comfortaa">
          Waktu sholat hari ini
        </p>
      </CardContent>
    </Card>
  );
}
```

### **2. Button Component**

```tsx
// Button dengan skema warna AWQAF
import { Button } from "@/components/ui/button";

export function PrayerButton() {
  return (
    <Button
      className="bg-awqaf-primary hover:bg-accent-600 text-white font-comfortaa"
      variant="default"
    >
      Lihat Jadwal Sholat
    </Button>
  );
}
```

### **3. Status Indicators**

```tsx
// Status dengan warna yang sesuai
export function PrayerStatus({
  status,
}: {
  status: "current" | "completed" | "upcoming";
}) {
  const statusConfig = {
    current: { color: "bg-success", text: "Sekarang" },
    completed: { color: "bg-awqaf-secondary", text: "Selesai" },
    upcoming: { color: "bg-accent-200", text: "Akan Datang" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${config.color}`}></span>
      <span className="text-awqaf-secondary text-xs font-comfortaa">
        {config.text}
      </span>
    </div>
  );
}
```

### **4. Arabic Text Styling**

```tsx
// Teks Arabic dengan font Tajawal
export function ArabicGreeting() {
  return (
    <div className="text-center">
      <h1 className="font-tajawal text-2xl text-awqaf-primary">السلام عليكم</h1>
      <p className="font-comfortaa text-awqaf-secondary mt-2">
        Assalamu'alaikum
      </p>
    </div>
  );
}
```

### **5. Icon dengan Background**

```tsx
// Icon dengan background accent
export function PrayerIcon() {
  return (
    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
      <Clock className="w-6 h-6 text-awqaf-primary" />
    </div>
  );
}
```

### **6. Gradient Background**

```tsx
// Background gradient dengan accent colors
export function PrayerContainer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100">
      {/* Content */}
    </div>
  );
}
```

### **7. Form Input**

```tsx
// Input dengan skema warna AWQAF
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LocationInput() {
  return (
    <div className="space-y-2">
      <Label className="text-card-foreground font-comfortaa">Lokasi Anda</Label>
      <Input
        className="border-awqaf-light focus:ring-awqaf-primary"
        placeholder="Masukkan kota atau alamat"
      />
    </div>
  );
}
```

### **8. Navigation Menu**

```tsx
// Navigation dengan accent colors
export function NavigationMenu() {
  return (
    <nav className="bg-card border-b border-awqaf-light">
      <div className="flex items-center space-x-4 p-4">
        <h1 className="text-xl font-bold text-awqaf-primary font-comfortaa">
          LegalApp
        </h1>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            className="text-awqaf-secondary hover:text-awqaf-primary"
          >
            Beranda
          </Button>
          <Button
            variant="ghost"
            className="text-awqaf-secondary hover:text-awqaf-primary"
          >
            Jadwal Sholat
          </Button>
        </div>
      </div>
    </nav>
  );
}
```

### **9. Alert/Notification**

```tsx
// Alert dengan status colors
export function PrayerAlert({
  type,
  message,
}: {
  type: "success" | "warning" | "error";
  message: string;
}) {
  const alertConfig = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
  };

  return (
    <div
      className={`p-4 rounded-lg border ${alertConfig[type]} font-comfortaa`}
    >
      {message}
    </div>
  );
}
```

### **10. Progress Bar**

```tsx
// Progress bar dengan accent colors
export function PrayerProgress({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-accent-100 rounded-full h-2">
      <div
        className="bg-awqaf-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
```

## 🌙 **Dark Mode Examples**

### **Dark Mode Card**

```tsx
// Card yang otomatis beradaptasi dengan dark mode
export function DarkModeCard() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <h3 className="text-card-foreground font-comfortaa">Jadwal Sholat</h3>
        <p className="text-muted-foreground font-comfortaa">
          Waktu sholat hari ini
        </p>
      </CardContent>
    </Card>
  );
}
```

## 📱 **Mobile-First Examples**

### **Responsive Prayer Grid**

```tsx
// Grid yang responsif dengan skema warna AWQAF
export function PrayerGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {prayers.map((prayer) => (
        <Card key={prayer.name} className="bg-card border-awqaf-light">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-awqaf-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground font-comfortaa">
              {prayer.name}
            </h3>
            <p className="text-xs text-awqaf-secondary font-comfortaa">
              {prayer.time}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

## 🎯 **Best Practices**

### **1. Konsistensi Font**

```tsx
// Selalu gunakan font yang sesuai
<h1 className="font-comfortaa text-awqaf-primary">Judul</h1>
<p className="font-tajawal text-awqaf-primary">النص العربي</p>
<span className="font-comfortaa text-awqaf-secondary">Deskripsi</span>
```

### **2. Hierarchy Warna**

```tsx
// Gunakan hierarchy yang jelas
<h1 className="text-card-foreground">Primary Heading</h1>
<h2 className="text-awqaf-primary">Secondary Heading</h2>
<p className="text-awqaf-secondary">Body Text</p>
<span className="text-muted-foreground">Caption</span>
```

### **3. Status Colors**

```tsx
// Gunakan warna status yang konsisten
<div className="text-success">Berhasil</div>
<div className="text-warning">Peringatan</div>
<div className="text-error">Error</div>
<div className="text-info">Informasi</div>
```

---

**Dengan mengikuti contoh-contoh ini, Anda dapat membuat komponen yang konsisten dan indah menggunakan skema warna AWQAF-inspired!**
