#!/usr/bin/env node

/**
 * Icon Generator Script for IbadahApp PWA
 * 
 * This script generates all required PWA icons from the main logo
 * using Node.js with sharp library for image processing
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available, if not provide instructions
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('❌ Sharp library not found. Please install it first:');
  console.error('npm install sharp');
  process.exit(1);
}

// Icon sizes required by manifest.json
const iconSizes = [
  { size: 72, name: 'icon-72x72.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' }
];

// Shortcut icon sizes
const shortcutSizes = [
  { size: 96, name: 'shortcut-sholat.png' },
  { size: 96, name: 'shortcut-qibla.png' },
  { size: 96, name: 'shortcut-quran.png' }
];

// Paths
const inputLogo = path.join(__dirname, '../public/ibadahapp-logo.png');
const iconsDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
  try {
    // Check if input logo exists
    if (!fs.existsSync(inputLogo)) {
      console.error('❌ Logo file not found:', inputLogo);
      console.error('Please make sure ibadahapp-logo.png exists in the public folder');
      process.exit(1);
    }

    // Create icons directory if it doesn't exist
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
      console.log('📁 Created icons directory');
    }

    console.log('🎨 Starting icon generation...');
    console.log('📸 Source logo:', inputLogo);

    // Get logo info
    const logoInfo = await sharp(inputLogo).metadata();
    console.log(`📏 Logo dimensions: ${logoInfo.width}x${logoInfo.height}`);

    // Generate main PWA icons
    console.log('\n🔄 Generating main PWA icons...');
    for (const icon of iconSizes) {
      const outputPath = path.join(iconsDir, icon.name);

      await sharp(inputLogo)
        .resize(icon.size, icon.size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background
        })
        .png({ quality: 100 })
        .toFile(outputPath);

      console.log(`✅ Generated: ${icon.name} (${icon.size}x${icon.size})`);
    }

    // Generate shortcut icons (same as main icons for now)
    console.log('\n🔄 Generating shortcut icons...');
    for (const shortcut of shortcutSizes) {
      const outputPath = path.join(iconsDir, shortcut.name);

      await sharp(inputLogo)
        .resize(shortcut.size, shortcut.size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png({ quality: 100 })
        .toFile(outputPath);

      console.log(`✅ Generated: ${shortcut.name} (${shortcut.size}x${shortcut.size})`);
    }

    // Generate favicon
    console.log('\n🔄 Generating favicon...');
    const faviconPath = path.join(__dirname, '../public/favicon.ico');
    await sharp(inputLogo)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(faviconPath.replace('.ico', '.png'));

    console.log('✅ Generated: favicon.png (32x32)');

    // Generate apple-touch-icon
    console.log('\n🔄 Generating Apple touch icon...');
    const appleTouchIconPath = path.join(iconsDir, 'apple-touch-icon.png');
    await sharp(inputLogo)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png({ quality: 100 })
      .toFile(appleTouchIconPath);

    console.log('✅ Generated: apple-touch-icon.png (180x180)');

    console.log('\n🎉 All icons generated successfully!');
    console.log('\n📋 Generated files:');

    // List all generated files
    const generatedFiles = fs.readdirSync(iconsDir);
    generatedFiles.forEach(file => {
      if (file.endsWith('.png')) {
        const filePath = path.join(iconsDir, file);
        const stats = fs.statSync(filePath);
        console.log(`   📄 ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
      }
    });

    console.log('\n💡 Next steps:');
    console.log('   1. Test the PWA installation on mobile devices');
    console.log('   2. Verify icons appear correctly in app launchers');
    console.log('   3. Check manifest.json validation');
    console.log('   4. Consider creating maskable icons for better Android support');

  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  generateIcons();
}

module.exports = { generateIcons, iconSizes, shortcutSizes };
