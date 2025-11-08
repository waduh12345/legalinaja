# Integrasi Theme dengan Tailwind CSS

Dokumentasi ini menjelaskan bagaimana skema warna AWQAF-inspired terintegrasi dengan Tailwind CSS melalui `@theme inline`.

## 🎯 **Konsep Integrasi**

Dengan menggunakan `@theme inline` di Tailwind CSS v4, kita tidak perlu lagi membuat utility classes manual. Tailwind akan otomatis generate utility classes berdasarkan definisi di theme.

### **Sebelum (Manual Utility Classes)**

```css
/* ❌ Tidak diperlukan lagi */
.bg-awqaf-primary {
  background-color: hsl(var(--accent));
}

.text-awqaf-secondary {
  color: hsl(var(--foreground-secondary));
}
```

### **Sesudah (Theme Integration)**

```css
/* ✅ Didefinisikan di @theme inline */
@theme inline {
  --color-awqaf-primary: var(--accent);
  --color-awqaf-foreground-secondary: var(--foreground-secondary);
}
```

## 🛠️ **Definisi Theme**

### **AWQAF-inspired Custom Colors**

```css
@theme inline {
  /* AWQAF-inspired Custom Colors */
  --color-awqaf-primary: var(--accent);
  --color-awqaf-subtle: var(--accent-subtle);
  --color-awqaf-secondary: var(--background-secondary);
  --color-awqaf-foreground: var(--foreground);
  --color-awqaf-foreground-secondary: var(--foreground-secondary);
  --color-awqaf-foreground-tertiary: var(--foreground-tertiary);
  --color-awqaf-background-tertiary: var(--background-tertiary);
  --color-awqaf-border: var(--border);
  --color-awqaf-border-light: var(--border-light);
  --color-awqaf-border-dark: var(--border-dark);

  /* Status Colors */
  --color-success: var(--success);
  --color-success-light: var(--success-light);
  --color-warning: var(--warning);
  --color-warning-light: var(--warning-light);
  --color-error: var(--error);
  --color-error-light: var(--error-light);
  --color-info: var(--info);
  --color-info-light: var(--info-light);

  /* Accent Palette */
  --color-accent-50: var(--accent-50);
  --color-accent-100: var(--accent-100);
  --color-accent-200: var(--accent-200);
  --color-accent-300: var(--accent-300);
  --color-accent-400: var(--accent-400);
  --color-accent-500: var(--accent-500);
  --color-accent-600: var(--accent-600);
  --color-accent-700: var(--accent-700);
  --color-accent-800: var(--accent-800);
  --color-accent-900: var(--accent-900);
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

## 🔄 **Migration Guide**

### **Dari Manual Classes ke Theme Integration**

#### **Sebelum:**

```tsx
// ❌ Menggunakan manual utility classes
<div className="bg-awqaf-primary text-awqaf-foreground border-awqaf-light">
  <h1 className="text-awqaf-primary">Judul</h1>
  <p className="text-awqaf-secondary">Deskripsi</p>
</div>
```

#### **Sesudah:**

```tsx
// ✅ Menggunakan theme-generated classes
<div className="bg-awqaf-primary text-awqaf-foreground border-awqaf-border-light">
  <h1 className="text-awqaf-primary">Judul</h1>
  <p className="text-awqaf-foreground-secondary">Deskripsi</p>
</p>
```

### **Perubahan Naming Convention**

| Sebelum                | Sesudah                           | Keterangan      |
| ---------------------- | --------------------------------- | --------------- |
| `text-awqaf-secondary` | `text-awqaf-foreground-secondary` | Lebih spesifik  |
| `border-awqaf-light`   | `border-awqaf-border-light`       | Lebih konsisten |
| `bg-awqaf-secondary`   | `bg-awqaf-secondary`              | Tetap sama      |

## 🎯 **Keuntungan Theme Integration**

### **1. Konsistensi**

- Semua utility classes mengikuti konvensi Tailwind
- Naming yang konsisten dan predictable

### **2. Performance**

- Tidak ada CSS manual yang redundant
- Tailwind hanya generate classes yang digunakan

### **3. Maintainability**

- Satu sumber kebenaran di `@theme inline`
- Mudah untuk update dan customize

### **4. Type Safety**

- IntelliSense yang lebih baik
- Auto-completion yang akurat

## 🚀 **Best Practices**

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

## 🔧 **Customization**

### **Menambah Warna Baru**

```css
@theme inline {
  /* Tambahkan warna baru */
  --color-awqaf-special: var(--special-color);
}
```

### **Mengubah Warna Existing**

```css
:root {
  /* Ubah warna di level CSS variable */
  --accent: oklch(0.6 0.1 70); /* Warna baru */
}
```

---

**Dengan integrasi theme ini, LegalApp memiliki sistem warna yang lebih robust, maintainable, dan performant!**
