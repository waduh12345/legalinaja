# App Loader Component - LegalApp PWA

Dokumentasi lengkap untuk component AppLoader yang digunakan untuk menampilkan loading screen saat aplikasi pertama kali dimuat atau saat reload.

## 🎯 **Fitur Utama**

### **Visual Elements**

- ✅ **Logo Aplikasi**: Menampilkan logo LegalApp dengan animasi
- ✅ **Nama Aplikasi**: "LegalApp" dengan subtitle "Aplikasi Solusi Hukum Terpercaya"
- ✅ **Progress Bar**: Indikator loading dengan animasi shimmer
- ✅ **Loading Text**: Teks yang berubah sesuai progress
- ✅ **Versi Aplikasi**: Menampilkan versi 1.0.0
- ✅ **Loading Dots**: Animasi bouncing dots

### **Animasi & Effects**

- ✅ **Logo Float**: Animasi mengambang untuk logo
- ✅ **Rotating Ring**: Ring berputar di sekitar logo
- ✅ **Pulse Glow**: Efek glow yang berdenyut
- ✅ **Shimmer Effect**: Efek shimmer pada progress bar
- ✅ **Fade In/Out**: Transisi smooth saat muncul/hilang
- ✅ **Scale In**: Animasi scale untuk logo container

## 🎨 **Design Features**

### **Mobile-First Design**

- **Responsive**: Optimized untuk mobile devices
- **Touch-Friendly**: Ukuran yang sesuai untuk touch interface
- **Fast Loading**: Minimal loading time untuk better UX
- **Smooth Animations**: 60fps animations untuk performa optimal

### **AWQAF Color Scheme**

- **Background**: Gradient dari accent-50 ke accent-100
- **Logo Container**: White background dengan accent border
- **Progress Bar**: Accent-500 ke accent-600 gradient
- **Text Colors**: Menggunakan AWQAF color variables
- **Decorative Elements**: Accent colors untuk consistency

## 🛠️ **Technical Implementation**

### **Component Structure**

```tsx
AppLoader
├── Background Pattern (Radial dots)
├── Main Content Container
│   ├── Logo Container
│   │   ├── Background Glow
│   │   ├── Logo Image
│   │   └── Rotating Ring
│   ├── App Name & Subtitle
│   ├── Progress Bar
│   │   ├── Progress Fill
│   │   └── Shimmer Effect
│   ├── Loading Text & Percentage
│   ├── Loading Dots Animation
│   └── Version Info
└── Decorative Elements
```

### **Props Interface**

```tsx
interface AppLoaderProps {
  onLoadComplete?: () => void;
  minLoadTime?: number; // Default: 2000ms
}
```

### **Hook Integration**

```tsx
// useAppLoader hook
const { isLoading, setLoading, completeLoading } = useAppLoader();

// Features:
// - First visit detection
// - Reload detection
// - Session storage management
// - Loading state management
```

## 🎭 **Animation Details**

### **Custom Keyframes**

```css
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### **Animation Classes**

- `.animate-shimmer` - Shimmer effect untuk progress bar
- `.animate-pulse-glow` - Pulse glow untuk logo background
- `.animate-float` - Float animation untuk logo
- `.animate-rotate-slow` - Slow rotation untuk ring
- `.animate-fade-in-up` - Fade in up untuk main content
- `.animate-scale-in` - Scale in untuk logo container

## 📱 **Mobile Optimization**

### **Performance Features**

- **Lazy Loading**: Logo image dengan priority loading
- **Optimized Animations**: CSS animations untuk better performance
- **Minimal DOM**: Efficient component structure
- **Fast Transitions**: 300ms transitions untuk responsiveness

### **Touch Optimization**

- **Large Touch Targets**: Adequate spacing untuk touch
- **Smooth Scrolling**: Prevent scroll during loading
- **Viewport Meta**: Proper viewport configuration
- **Safe Areas**: Support untuk device safe areas

## 🔧 **Customization Options**

### **Loading Time**

```tsx
<AppLoader
  minLoadTime={3000} // 3 seconds minimum
  onLoadComplete={() => console.log("Loading complete!")}
/>
```

### **Loading Text Customization**

Edit di `AppLoader.tsx`:

```tsx
const loadingTexts = [
  "Memuat aplikasi...",
  "Menyiapkan fitur...",
  "Hampir selesai...",
  "Siap digunakan!",
];
```

### **Progress Simulation**

```tsx
// Customize progress increment
setProgress((prev) => prev + Math.random() * 15); // Random 0-15%
```

### **Animation Timing**

```css
/* Customize animation duration */
.animate-float {
  animation-duration: 3s;
}
.animate-rotate-slow {
  animation-duration: 3s;
}
.animate-shimmer {
  animation-duration: 2s;
}
```

## 🧪 **Testing & Debugging**

### **Development Testing**

```tsx
// Force show loader
const { setLoading } = useAppLoader();
setLoading(true);

// Test different loading times
<AppLoader minLoadTime={5000} />;
```

### **Performance Monitoring**

- **Lighthouse**: Check loading performance
- **Chrome DevTools**: Monitor animation performance
- **Network Tab**: Check resource loading
- **Performance Tab**: Analyze animation frames

### **Mobile Testing**

- **Chrome DevTools**: Mobile device simulation
- **Real Devices**: Test pada actual mobile devices
- **Different Networks**: Test pada slow connections
- **Battery Impact**: Monitor battery usage

## 🚀 **Advanced Features**

### **PWA Integration**

- **Service Worker**: Loading state coordination
- **Offline Support**: Handle offline loading
- **Cache Management**: Optimize resource loading
- **Installation**: PWA install prompt integration

### **Accessibility**

- **Screen Reader**: Proper ARIA labels
- **Keyboard Navigation**: Focus management
- **Color Contrast**: WCAG compliance
- **Motion Preferences**: Respect user preferences

### **Internationalization**

- **Multi-language**: Support untuk multiple languages
- **RTL Support**: Right-to-left language support
- **Font Loading**: Proper font loading strategy
- **Text Direction**: Dynamic text direction

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Loader Not Showing**

```tsx
// Check session storage
console.log(sessionStorage.getItem("LegalApp-visited"));

// Force show loader
setLoading(true);
```

#### **Animation Performance**

```css
/* Enable hardware acceleration */
.animate-float {
  transform: translateZ(0);
  will-change: transform;
}
```

#### **Logo Not Loading**

```tsx
// Check image path
<Image src="/LegalApp-logo.png" alt="Logo" />

// Verify file exists in public folder
```

#### **Loading Time Issues**

```tsx
// Adjust minimum loading time
<AppLoader minLoadTime={1000} />;

// Check progress simulation
setProgress((prev) => prev + 10); // Fixed increment
```

### **Debug Mode**

```tsx
// Add debug logging
useEffect(() => {
  console.log("Loader progress:", progress);
  console.log("Loading text:", loadingText);
}, [progress, loadingText]);
```

## 📊 **Performance Metrics**

### **Target Metrics**

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### **Animation Performance**

- **60 FPS**: Smooth animations
- **GPU Acceleration**: Hardware acceleration
- **Minimal Repaints**: Efficient rendering
- **Memory Usage**: Low memory footprint

---

**AppLoader component memberikan pengalaman loading yang smooth dan menarik untuk LegalApp PWA, dengan optimasi mobile-first dan integrasi yang seamless dengan sistem PWA!**
