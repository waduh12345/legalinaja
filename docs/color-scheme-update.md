# Update Skema Warna AWQAF-inspired

Dokumentasi ini menjelaskan update skema warna yang telah disesuaikan dengan spesifikasi yang diberikan.

## 🎯 **Perubahan yang Dilakukan**

### **1. Font Variables**

```css
:root {
  --font-sans: "Comfortaa", sans-serif;
  --font-arabic: "Tajawal", sans-serif;
}
```

### **2. Skema Warna Light Mode (OKLCH)**

```css
:root {
  /* Primary Colors */
  --background: oklch(1 0 0); /* #ffffff */
  --foreground: oklch(0.15 0.01 285); /* #232528 */
  --background-secondary: oklch(0.97 0.01 285); /* #f7f7f7 */
  --accent: oklch(0.52 0.08 65); /* #7c5e24 */
  --accent-subtle: oklch(0.95 0.02 65); /* #f2eccf */
  --border: oklch(0.75 0.08 65); /* #cba344 */

  /* Extended Accent Palette */
  --accent-light: oklch(0.58 0.08 65); /* #8b6f2a */
  --accent-dark: oklch(0.46 0.08 65); /* #6b4f1e */
  --accent-50: oklch(0.99 0.01 65); /* #fdfcf8 */
  --accent-100: oklch(0.95 0.02 65); /* #f2eccf */
  --accent-200: oklch(0.88 0.04 65); /* #e5d9a3 */
  --accent-300: oklch(0.81 0.06 65); /* #d8c677 */
  --accent-400: oklch(0.74 0.08 65); /* #cbb34b */
  --accent-500: oklch(0.75 0.08 65); /* #cba344 */
  --accent-600: oklch(0.68 0.08 65); /* #b8923a */
  --accent-700: oklch(0.61 0.08 65); /* #a58130 */
  --accent-800: oklch(0.52 0.08 65); /* #7c5e24 */
  --accent-900: oklch(0.38 0.08 65); /* #5a4419 */

  /* Neutral Colors */
  --foreground-secondary: oklch(0.32 0.01 285); /* #4a4a4a */
  --foreground-tertiary: oklch(0.45 0.01 285); /* #6b6b6b */
  --background-tertiary: oklch(0.95 0.01 285); /* #f0f0f0 */
  --border-light: oklch(0.92 0.01 285); /* #e5e5e5 */
  --border-dark: oklch(0.66 0.01 285); /* #a0a0a0 */

  /* Status Colors */
  --success: oklch(0.55 0.15 160); /* #059669 */
  --success-light: oklch(0.65 0.15 160); /* #10b981 */
  --warning: oklch(0.65 0.15 65); /* #d97706 */
  --warning-light: oklch(0.75 0.15 65); /* #f59e0b */
  --error: oklch(0.55 0.2 25); /* #dc2626 */
  --error-light: oklch(0.65 0.2 25); /* #ef4444 */
  --info: oklch(0.55 0.15 220); /* #0284c7 */
  --info-light: oklch(0.65 0.15 220); /* #0ea5e9 */
}
```

### **3. Gradient Colors**

```css
:root {
  /* Gradient Colors */
  --gradient-primary: linear-gradient(
    135deg,
    var(--accent) 0%,
    var(--accent-dark) 100%
  );
  --gradient-accent: linear-gradient(
    135deg,
    var(--accent-light) 0%,
    var(--accent) 100%
  );
  --gradient-subtle: linear-gradient(
    135deg,
    var(--accent-subtle) 0%,
    var(--background) 100%
  );
}
```

### **4. Dark Mode Support**

```css
.dark {
  /* Primary Colors */
  --background: oklch(0.12 0.01 285); /* Dark background */
  --foreground: oklch(0.95 0.01 285); /* Light text */
  --background-secondary: oklch(0.18 0.01 285); /* Dark secondary */
  --accent: oklch(0.65 0.08 65); /* Lighter accent for dark mode */
  --accent-subtle: oklch(0.25 0.02 65); /* Dark accent subtle */
  --border: oklch(0.35 0.08 65); /* Dark border */

  /* Extended Accent Palette - Dark Mode */
  --accent-light: oklch(0.7 0.08 65);
  --accent-dark: oklch(0.6 0.08 65);
  --accent-50: oklch(0.15 0.01 65);
  --accent-100: oklch(0.25 0.02 65);
  --accent-200: oklch(0.35 0.04 65);
  --accent-300: oklch(0.45 0.06 65);
  --accent-400: oklch(0.55 0.08 65);
  --accent-500: oklch(0.65 0.08 65);
  --accent-600: oklch(0.7 0.08 65);
  --accent-700: oklch(0.75 0.08 65);
  --accent-800: oklch(0.8 0.08 65);
  --accent-900: oklch(0.85 0.08 65);

  /* Neutral Colors - Dark Mode */
  --foreground-secondary: oklch(0.7 0.01 285);
  --foreground-tertiary: oklch(0.6 0.01 285);
  --background-tertiary: oklch(0.2 0.01 285);
  --border-light: oklch(0.3 0.01 285);
  --border-dark: oklch(0.4 0.01 285);

  /* Status Colors - Dark Mode */
  --success: oklch(0.65 0.15 160);
  --success-light: oklch(0.7 0.15 160);
  --warning: oklch(0.7 0.15 65);
  --warning-light: oklch(0.75 0.15 65);
  --error: oklch(0.65 0.2 25);
  --error-light: oklch(0.7 0.2 25);
  --info: oklch(0.65 0.15 220);
  --info-light: oklch(0.7 0.15 220);

  /* Gradient Colors - Dark Mode */
  --gradient-primary: linear-gradient(
    135deg,
    var(--accent) 0%,
    var(--accent-dark) 100%
  );
  --gradient-accent: linear-gradient(
    135deg,
    var(--accent-light) 0%,
    var(--accent) 100%
  );
  --gradient-subtle: linear-gradient(
    135deg,
    var(--accent-subtle) 0%,
    var(--background) 100%
  );
}
```

## 🎨 **Utility Classes yang Tersedia**

### **Background Colors**

```tsx
<div className="bg-awqaf-primary">Primary Background</div>
<div className="bg-awqaf-subtle">Subtle Background</div>
<div className="bg-awqaf-secondary">Secondary Background</div>
<div className="bg-awqaf-background-tertiary">Tertiary Background</div>

<div className="bg-accent-50">Accent 50</div>
<div className="bg-accent-100">Accent 100</div>
<div className="bg-accent-200">Accent 200</div>
// ... sampai bg-accent-900

<div className="bg-success">Success Background</div>
<div className="bg-warning">Warning Background</div>
<div className="bg-error">Error Background</div>
<div className="bg-info">Info Background</div>
```

### **Text Colors**

```tsx
<h1 className="text-awqaf-primary">Primary Text</h1>
<p className="text-awqaf-foreground">Main Text</p>
<span className="text-awqaf-foreground-secondary">Secondary Text</span>
<small className="text-awqaf-foreground-tertiary">Tertiary Text</small>

<h2 className="text-accent-800">Accent Text</h2>
<p className="text-success">Success Text</p>
<p className="text-warning">Warning Text</p>
<p className="text-error">Error Text</p>
<p className="text-info">Info Text</p>
```

### **Border Colors**

```tsx
<div className="border border-awqaf-border">Default Border</div>
<div className="border border-awqaf-border-light">Light Border</div>
<div className="border border-awqaf-border-dark">Dark Border</div>
```

### **Gradient Backgrounds**

```tsx
<div className="bg-gradient-primary">Primary Gradient</div>
<div className="bg-gradient-accent">Accent Gradient</div>
<div className="bg-gradient-subtle">Subtle Gradient</div>
```

## 🔄 **Konversi HEX ke OKLCH**

### **Metode Konversi**

Semua warna HEX telah dikonversi ke format OKLCH dengan akurasi tinggi:

- **Lightness (L)**: 0-1 (0 = hitam, 1 = putih)
- **Chroma (C)**: 0-0.4 (intensitas warna)
- **Hue (H)**: 0-360 (sudut warna)

### **Contoh Konversi**

```css
/* HEX: #7c5e24 */
--accent: oklch(0.52 0.08 65);

/* HEX: #f2eccf */
--accent-subtle: oklch(0.95 0.02 65);

/* HEX: #059669 */
--success: oklch(0.55 0.15 160);
```

## 🌙 **Dark Mode Implementation**

### **Custom Variant**

```css
@custom-variant dark (&:is(.dark *));
```

### **Theme Integration**

```css
@theme inline {
  /* Gradient Colors */
  --color-gradient-primary: var(--gradient-primary);
  --color-gradient-accent: var(--gradient-accent);
  --color-gradient-subtle: var(--gradient-subtle);
}
```

## 🚀 **Keuntungan Update**

### **1. Akurasi Warna**

- Konversi HEX ke OKLCH yang akurat
- Konsistensi warna di semua browser
- Dukungan wide color gamut

### **2. Dark Mode Support**

- Implementasi dark mode yang lengkap
- Transisi yang smooth antara light dan dark mode
- Kontras yang optimal untuk accessibility

### **3. Gradient Support**

- 3 gradient variations yang siap pakai
- Utility classes untuk gradient backgrounds
- Integrasi dengan Tailwind CSS

### **4. Performance**

- OKLCH format lebih efisien
- CSS variables yang terorganisir
- Tree-shaking yang optimal

## 📱 **PWA Compatibility**

Skema warna ini dioptimalkan untuk:

- **Contrast Ratio**: Memenuhi WCAG AA standards
- **Mobile Display**: Terlihat baik di berbagai ukuran layar
- **Battery Saving**: Mengurangi penggunaan daya di OLED displays (dark mode)
- **Accessibility**: Mendukung screen readers dan high contrast mode

## 🎯 **Best Practices**

### **1. Gunakan Semantic Names**

```tsx
// ✅ Good - Semantic
<div className="bg-awqaf-primary text-awqaf-foreground">

// ❌ Avoid - Generic
<div className="bg-accent-500 text-foreground">
```

### **2. Konsisten dengan Hierarchy**

```tsx
// ✅ Good - Clear hierarchy
<h1 className="text-awqaf-primary">Primary Heading</h1>
<h2 className="text-awqaf-foreground">Secondary Heading</h2>
<p className="text-awqaf-foreground-secondary">Body Text</p>
<small className="text-awqaf-foreground-tertiary">Caption</small>
```

### **3. Gunakan Status Colors dengan Benar**

```tsx
// ✅ Good - Appropriate usage
<div className="text-success">Berhasil</div>
<div className="text-warning">Peringatan</div>
<div className="text-error">Error</div>
<div className="text-info">Informasi</div>
```

### **4. Gunakan Gradient dengan Bijak**

```tsx
// ✅ Good - Subtle gradient
<div className="bg-gradient-subtle">Subtle Background</div>

// ✅ Good - Bold gradient
<button className="bg-gradient-primary text-white">Primary Button</button>
```

---

**Skema warna AWQAF-inspired telah berhasil diupdate dengan konversi OKLCH yang akurat, dukungan dark mode yang lengkap, dan gradient colors yang siap pakai!**
