# IbadahApp - Aplikasi Ibadah Muslim PWA

IbadahApp adalah aplikasi Progressive Web App (PWA) yang dirancang khusus untuk umat Muslim. Aplikasi ini menyediakan berbagai fitur ibadah seperti jadwal sholat, arah qibla, Al-Quran, dan dzikir.

## 🚀 Fitur PWA

- ✅ **Installable** - Dapat diinstall di perangkat mobile dan desktop
- ✅ **Offline Ready** - Berfungsi tanpa koneksi internet
- ✅ **Push Notifications** - Notifikasi reminder sholat
- ✅ **Responsive Design** - Optimal di semua ukuran layar
- ✅ **Fast Loading** - Loading cepat dengan service worker
- ✅ **App-like Experience** - Pengalaman seperti aplikasi native

## 🛠️ Teknologi

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **PWA**: Service Worker, Web App Manifest
- **Icons**: Custom Islamic-themed icons

## 📱 Fitur Aplikasi

### Fitur Utama

- 🕐 **Jadwal Sholat** - Waktu sholat harian berdasarkan lokasi
- 🧭 **Arah Qibla** - Kompas digital menuju Ka'bah
- 📖 **Al-Quran** - Baca Al-Quran dengan terjemahan
- 📿 **Dzikir & Doa** - Kumpulan dzikir dan doa harian

### Fitur PWA

- 📲 **Install Prompt** - Notifikasi untuk install aplikasi
- 🔔 **Push Notifications** - Reminder waktu sholat
- 💾 **Offline Storage** - Data tersimpan untuk akses offline
- ⚡ **Background Sync** - Sinkronisasi data di background

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, atau bun

### Installation

1. **Clone repository**

```bash
git clone <repository-url>
cd ibadahapp-pwa
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. **Run development server**

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

4. **Open browser**
   Buka [http://localhost:3000](http://localhost:3000) di browser

### Testing PWA Features

1. **Install Prompt**: Buka di Chrome/Edge, akan muncul prompt install
2. **Offline Mode**: Matikan internet, aplikasi tetap berfungsi
3. **Mobile View**: Gunakan DevTools untuk test mobile experience

## 📁 Struktur Proyek

```
ibadahapp-pwa/
├── app/
│   ├── components/
│   │   └── PWAInstaller.tsx    # Komponen install PWA
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout dengan PWA config
│   └── page.tsx                # Homepage aplikasi
├── public/
│   ├── icons/                  # PWA icons (berbagai ukuran)
│   ├── screenshots/            # Screenshots untuk PWA
│   ├── manifest.json           # Web App Manifest
│   └── sw.js                   # Service Worker
├── next.config.ts              # Next.js config untuk PWA
└── package.json
```

## 🎨 Customization

### Mengubah Icon PWA

1. Ganti file di folder `public/icons/`
2. Update `manifest.json` jika ada perubahan ukuran
3. Pastikan semua ukuran tersedia (72x72, 96x96, 128x128, dll)

### Mengubah Theme Color

1. Update `theme_color` di `manifest.json`
2. Update `theme-color` meta tag di `layout.tsx`
3. Update warna di Tailwind config jika perlu

### Menambah Fitur Baru

1. Buat komponen di `app/components/`
2. Update service worker untuk cache asset baru
3. Update manifest.json untuk shortcut baru

## 📱 PWA Checklist

- ✅ Web App Manifest
- ✅ Service Worker
- ✅ HTTPS (untuk production)
- ✅ Responsive Design
- ✅ Install Prompt
- ✅ Offline Functionality
- ✅ Push Notifications
- ✅ App Icons (berbagai ukuran)
- ✅ Meta Tags untuk mobile

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy ke Vercel
```

### Manual Build

```bash
npm run build
npm run start
```

### PWA Requirements untuk Production

- ✅ HTTPS enabled
- ✅ Valid SSL certificate
- ✅ Service worker registered
- ✅ Manifest accessible
- ✅ Icons available

## 🔧 Development

### Scripts Available

- `npm run dev` - Development server dengan Turbopack
- `npm run build` - Build untuk production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### PWA Testing Tools

- Chrome DevTools > Application > Manifest
- Chrome DevTools > Application > Service Workers
- Lighthouse PWA audit
- Web.dev PWA checklist

## 📞 Support

Untuk pertanyaan atau bantuan, silakan buat issue di repository ini.

## 📄 License

Proyek ini dibuat untuk keperluan ibadah umat Muslim. Silakan gunakan dengan bijak.

---

**IbadahApp** - Dibuat dengan ❤️ untuk umat Muslim

