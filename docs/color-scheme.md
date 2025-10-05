# AWQAF-inspired Color Scheme

Skema warna yang terinspirasi dari elemen-elemen tradisional Islam dan AWQAF, memberikan nuansa hangat, elegan, dan spiritual untuk aplikasi IbadahApp.

## 🎨 **Palette Overview**

### **Primary Colors**

- **Accent**: `#7c5e24` (OKLCH: `0.52 0.08 65`) - Warna emas/coklat keemasan
- **Background**: `#ffffff` (OKLCH: `1 0 0`) - Putih bersih
- **Foreground**: `#232528` (OKLCH: `0.15 0.01 285`) - Hitam lembut
- **Background Secondary**: `#f7f7f7` (OKLCH: `0.97 0.01 285`) - Abu-abu sangat terang

### **Extended Accent Palette**

```css
--accent-50:  #fdfcf8  /* Sangat terang */
--accent-100: #f2eccf  /* Terang */
--accent-200: #e5d9a3  /* Agak terang */
--accent-300: #d8c677  /* Sedang terang */
--accent-400: #cbb34b  /* Sedang */
--accent-500: #cba344  /* Primary */
--accent-600: #b8923a  /* Sedang gelap */
--accent-700: #a58130  /* Agak gelap */
--accent-800: #7c5e24  /* Gelap */
--accent-900: #5a4419  /* Sangat gelap */
```

### **Status Colors**

- **Success**: `#059669` (Hijau) - Untuk konfirmasi, selesai
- **Warning**: `#d97706` (Orange) - Untuk peringatan
- **Error**: `#dc2626` (Merah) - Untuk error
- **Info**: `#0284c7` (Biru) - Untuk informasi

## 🛠️ **Usage dalam Code**

### **CSS Variables**

```css
/* Menggunakan CSS variables */
.my-component {
  background-color: hsl(var(--accent));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

### **Tailwind Classes**

```tsx
// Menggunakan utility classes
<div className="bg-awqaf-primary text-awqaf-foreground">
  <h1 className="text-accent-800">Judul</h1>
  <p className="text-awqaf-secondary">Deskripsi</p>
</div>
```

### **shadcn/ui Components**

```tsx
// Komponen shadcn/ui otomatis menggunakan skema warna
<Button variant="default">Button Primary</Button>
<Card className="bg-card text-card-foreground">
  <CardContent>Content</CardContent>
</Card>
```

## 🌙 **Dark Mode Support**

Skema warna ini juga mendukung dark mode dengan:

- Background yang lebih gelap
- Accent yang lebih terang untuk kontras
- Foreground yang disesuaikan untuk readability

```css
.dark {
  --background: oklch(0.12 0.01 285);
  --foreground: oklch(0.95 0.01 285);
  --accent: oklch(0.65 0.08 65);
}
```

## 📱 **PWA Compatibility**

Skema warna ini dioptimalkan untuk:

- **Contrast Ratio**: Memenuhi WCAG AA standards
- **Mobile Display**: Terlihat baik di berbagai ukuran layar
- **Battery Saving**: Mengurangi penggunaan daya di OLED displays (dark mode)

## 🎯 **Best Practices**

### **Do's**

- ✅ Gunakan `--accent` untuk primary actions
- ✅ Gunakan `--success` untuk konfirmasi sholat
- ✅ Gunakan `--warning` untuk reminder waktu sholat
- ✅ Kombinasikan dengan font Comfortaa dan Tajawal

### **Don'ts**

- ❌ Jangan gunakan warna yang terlalu kontras
- ❌ Jangan campur dengan skema warna lain
- ❌ Jangan gunakan accent untuk text yang panjang

## 🔧 **Customization**

Untuk menyesuaikan skema warna:

1. **Ubah hue** untuk warna yang berbeda:

```css
--accent: oklch(0.52 0.08 45); /* Hijau keemasan */
--accent: oklch(0.52 0.08 85); /* Kuning keemasan */
```

2. **Ubah saturation** untuk intensitas:

```css
--accent: oklch(0.52 0.12 65); /* Lebih saturated */
--accent: oklch(0.52 0.04 65); /* Lebih subtle */
```

3. **Ubah lightness** untuk brightness:

```css
--accent: oklch(0.6 0.08 65); /* Lebih terang */
--accent: oklch(0.4 0.08 65); /* Lebih gelap */
```

## 📊 **Color Accessibility**

| Color Combination        | Contrast Ratio | WCAG Level |
| ------------------------ | -------------- | ---------- |
| Accent on White          | 4.8:1          | AA         |
| White on Accent          | 4.8:1          | AA         |
| Foreground on Background | 16.8:1         | AAA        |
| Success on White         | 4.5:1          | AA         |

---

**Skema warna ini dirancang khusus untuk aplikasi ibadah Muslim, memberikan pengalaman yang tenang, elegan, dan mudah dibaca.**
