# Icon Generation Guide - LegalApp PWA

Panduan lengkap untuk generate icon-icon PWA yang diperlukan berdasarkan logo utama `LegalApp-logo.png`.

## 🎯 **Icon yang Diperlukan**

### **Main PWA Icons**

- `icon-72x72.png` - Android Chrome
- `icon-96x96.png` - Android Chrome
- `icon-128x128.png` - Android Chrome
- `icon-144x144.png` - Windows tiles
- `icon-152x152.png` - iOS Safari
- `icon-192x192.png` - Android Chrome
- `icon-384x384.png` - Android Chrome
- `icon-512x512.png` - Android Chrome, Splash screen

### **Shortcut Icons**

- `shortcut-sholat.png` - Jadwal Sholat shortcut
- `shortcut-qibla.png` - Qibla Direction shortcut
- `shortcut-quran.png` - Al-Quran shortcut

### **Additional Icons**

- `favicon.png` - Browser favicon (32x32)
- `apple-touch-icon.png` - iOS Safari (180x180)

## 🛠️ **Metode Generation**

### **1. Menggunakan Sharp (Node.js) - Recommended**

#### **Installation**

```bash
npm install sharp
```

#### **Generate Icons**

```bash
npm run generate-icons
# atau
npm run generate-icons:sharp
```

#### **Keuntungan**

- ✅ High quality image processing
- ✅ Cross-platform support
- ✅ Fast processing
- ✅ Automatic optimization

### **2. Menggunakan ImageMagick**

#### **Installation**

**Ubuntu/Debian:**

```bash
sudo apt-get install imagemagick
```

**macOS:**

```bash
brew install imagemagick
```

**Windows:**
Download dari [ImageMagick Official Site](https://imagemagick.org/script/download.php)

#### **Generate Icons**

```bash
npm run generate-icons:imagemagick
# atau
chmod +x scripts/generate-icons-imagemagick.sh
./scripts/generate-icons-imagemagick.sh
```

#### **Keuntungan**

- ✅ Industry standard
- ✅ Advanced image processing
- ✅ Command line interface
- ✅ Batch processing

### **3. Menggunakan PowerShell (Windows)**

#### **Generate Icons**

```bash
npm run generate-icons:powershell
# atau
powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1
```

#### **Keuntungan**

- ✅ Native Windows support
- ✅ No additional dependencies
- ✅ .NET System.Drawing integration

## 📁 **Struktur File**

```
public/
├── LegalApp-logo.png          # Logo utama (source)
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   ├── icon-512x512.png
│   ├── shortcut-sholat.png
│   ├── shortcut-qibla.png
│   ├── shortcut-quran.png
│   └── apple-touch-icon.png
├── favicon.png                 # Browser favicon
└── manifest.json              # PWA manifest
```

## 🎨 **Icon Specifications**

### **Format**

- **Format**: PNG
- **Background**: Transparent
- **Quality**: High (100% for Sharp, optimized for others)

### **Sizing**

- **Method**: Fit to contain (maintain aspect ratio)
- **Centering**: Center-aligned
- **Padding**: Automatic transparent padding

### **Optimization**

- **Compression**: Lossless PNG
- **Color Space**: sRGB
- **Transparency**: Preserved

## 🔧 **Customization**

### **Modify Icon Sizes**

Edit `scripts/generate-icons.js`:

```javascript
const iconSizes = [
  { size: 72, name: "icon-72x72.png" },
  { size: 96, name: "icon-96x96.png" },
  // Add more sizes as needed
];
```

### **Add New Shortcut Icons**

Edit `scripts/generate-icons.js`:

```javascript
const shortcutSizes = [
  { size: 96, name: "shortcut-sholat.png" },
  { size: 96, name: "shortcut-qibla.png" },
  { size: 96, name: "shortcut-quran.png" },
  { size: 96, name: "shortcut-dzikir.png" }, // New shortcut
];
```

### **Change Output Directory**

Edit script parameters:

```javascript
const iconsDir = path.join(__dirname, "../public/custom-icons");
```

## 📱 **PWA Integration**

### **Manifest.json**

Icons sudah dikonfigurasi di `manifest.json`:

```json
{
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    }
    // ... other icons
  ]
}
```

### **HTML Meta Tags**

Icons sudah dikonfigurasi di `app/layout.tsx`:

```tsx
<link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
```

## 🧪 **Testing**

### **1. PWA Installation**

- Test di Chrome mobile
- Test di Safari iOS
- Test di Edge mobile

### **2. Icon Display**

- Check di app launcher
- Check di task switcher
- Check di notification area

### **3. Manifest Validation**

- Use [PWA Builder](https://www.pwabuilder.com/)
- Use Chrome DevTools
- Use Lighthouse audit

## 🚀 **Advanced Features**

### **Maskable Icons (Android)**

Untuk dukungan maskable icons yang lebih baik:

```javascript
// Generate maskable version
await sharp(inputLogo)
  .resize(icon.size, icon.size, {
    fit: "cover", // Fill entire square
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png({ quality: 100 })
  .toFile(outputPath.replace(".png", "-maskable.png"));
```

### **Adaptive Icons (Android)**

Untuk adaptive icons yang lebih modern:

```javascript
// Generate adaptive icon layers
const background = await sharp({
  create: {
    width: icon.size,
    height: icon.size,
    channels: 4,
    background: { r: 124, g: 94, b: 36, alpha: 1 }, // AWQAF accent color
  },
})
  .png()
  .toBuffer();

const foreground = await sharp(inputLogo)
  .resize(icon.size * 0.6, icon.size * 0.6)
  .png()
  .toBuffer();

await sharp(background)
  .composite([{ input: foreground, gravity: "center" }])
  .png()
  .toFile(outputPath.replace(".png", "-adaptive.png"));
```

## 🐛 **Troubleshooting**

### **Sharp Installation Issues**

```bash
# Clear npm cache
npm cache clean --force

# Reinstall sharp
npm uninstall sharp
npm install sharp

# For Windows, try:
npm install --platform=win32 --arch=x64 sharp
```

### **ImageMagick Permission Issues**

```bash
# Make script executable
chmod +x scripts/generate-icons-imagemagick.sh

# Check ImageMagick installation
convert -version
```

### **PowerShell Execution Policy**

```powershell
# Set execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or run with bypass
powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1
```

### **Logo Not Found**

- Pastikan `LegalApp-logo.png` ada di folder `public/`
- Check file permissions
- Verify file format (PNG, JPG, SVG supported)

## 📊 **Performance Tips**

### **Optimize Logo Source**

- Use PNG dengan transparansi
- Resolusi minimal 512x512
- File size < 1MB
- Optimize dengan tools seperti TinyPNG

### **Batch Processing**

- Generate semua ukuran sekaligus
- Use parallel processing untuk multiple files
- Cache intermediate results

### **CDN Integration**

- Upload icons ke CDN
- Use WebP format untuk browser support
- Implement lazy loading

## 🎯 **Best Practices**

### **1. Logo Design**

- Simple dan recognizable
- High contrast
- Works well at small sizes
- Consistent dengan brand identity

### **2. Icon Quality**

- Sharp edges pada semua ukuran
- Consistent colors
- Proper padding
- Test pada berbagai background

### **3. PWA Standards**

- Follow PWA icon guidelines
- Support maskable icons
- Provide multiple sizes
- Optimize file sizes

---

**Dengan panduan ini, Anda dapat generate semua icon PWA yang diperlukan dengan mudah dan efisien!**
