#!/bin/bash

# Icon Generator Script for LegalApp PWA using ImageMagick
# 
# This script generates all required PWA icons from the main logo
# using ImageMagick (convert command)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
INPUT_LOGO="$PROJECT_ROOT/public/LegalApp-logo.png"
ICONS_DIR="$PROJECT_ROOT/public/icons"

# Icon sizes required by manifest.json
declare -a ICON_SIZES=(72 96 128 144 152 192 384 512)

echo -e "${BLUE}🎨 LegalApp PWA Icon Generator${NC}"
echo -e "${BLUE}================================${NC}"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick not found. Please install it first:${NC}"
    echo -e "${YELLOW}   Ubuntu/Debian: sudo apt-get install imagemagick${NC}"
    echo -e "${YELLOW}   macOS: brew install imagemagick${NC}"
    echo -e "${YELLOW}   Windows: Download from https://imagemagick.org/script/download.php${NC}"
    exit 1
fi

# Check if input logo exists
if [ ! -f "$INPUT_LOGO" ]; then
    echo -e "${RED}❌ Logo file not found: $INPUT_LOGO${NC}"
    echo -e "${YELLOW}   Please make sure LegalApp-logo.png exists in the public folder${NC}"
    exit 1
fi

# Create icons directory if it doesn't exist
if [ ! -d "$ICONS_DIR" ]; then
    mkdir -p "$ICONS_DIR"
    echo -e "${GREEN}📁 Created icons directory${NC}"
fi

echo -e "${BLUE}📸 Source logo: $INPUT_LOGO${NC}"

# Get logo dimensions
LOGO_INFO=$(identify "$INPUT_LOGO" 2>/dev/null || echo "Unknown")
echo -e "${BLUE}📏 Logo info: $LOGO_INFO${NC}"

echo -e "\n${BLUE}🔄 Generating main PWA icons...${NC}"

# Generate main PWA icons
for size in "${ICON_SIZES[@]}"; do
    output_file="$ICONS_DIR/icon-${size}x${size}.png"
    
    convert "$INPUT_LOGO" \
        -resize "${size}x${size}" \
        -background transparent \
        -gravity center \
        -extent "${size}x${size}" \
        "$output_file"
    
    if [ $? -eq 0 ]; then
        file_size=$(du -h "$output_file" | cut -f1)
        echo -e "${GREEN}✅ Generated: icon-${size}x${size}.png ($file_size)${NC}"
    else
        echo -e "${RED}❌ Failed to generate: icon-${size}x${size}.png${NC}"
    fi
done

echo -e "\n${BLUE}🔄 Generating shortcut icons...${NC}"

# Generate shortcut icons
declare -a SHORTCUT_NAMES=("shortcut-sholat.png" "shortcut-qibla.png" "shortcut-quran.png")

for shortcut in "${SHORTCUT_NAMES[@]}"; do
    output_file="$ICONS_DIR/$shortcut"
    
    convert "$INPUT_LOGO" \
        -resize "96x96" \
        -background transparent \
        -gravity center \
        -extent "96x96" \
        "$output_file"
    
    if [ $? -eq 0 ]; then
        file_size=$(du -h "$output_file" | cut -f1)
        echo -e "${GREEN}✅ Generated: $shortcut ($file_size)${NC}"
    else
        echo -e "${RED}❌ Failed to generate: $shortcut${NC}"
    fi
done

echo -e "\n${BLUE}🔄 Generating favicon...${NC}"

# Generate favicon
FAVICON_PATH="$PROJECT_ROOT/public/favicon.png"
convert "$INPUT_LOGO" \
    -resize "32x32" \
    -background transparent \
    -gravity center \
    -extent "32x32" \
    "$FAVICON_PATH"

if [ $? -eq 0 ]; then
    file_size=$(du -h "$FAVICON_PATH" | cut -f1)
    echo -e "${GREEN}✅ Generated: favicon.png ($file_size)${NC}"
else
    echo -e "${RED}❌ Failed to generate: favicon.png${NC}"
fi

echo -e "\n${BLUE}🔄 Generating Apple touch icon...${NC}"

# Generate Apple touch icon
APPLE_TOUCH_ICON="$ICONS_DIR/apple-touch-icon.png"
convert "$INPUT_LOGO" \
    -resize "180x180" \
    -background transparent \
    -gravity center \
    -extent "180x180" \
    "$APPLE_TOUCH_ICON"

if [ $? -eq 0 ]; then
    file_size=$(du -h "$APPLE_TOUCH_ICON" | cut -f1)
    echo -e "${GREEN}✅ Generated: apple-touch-icon.png ($file_size)${NC}"
else
    echo -e "${RED}❌ Failed to generate: apple-touch-icon.png${NC}"
fi

echo -e "\n${GREEN}🎉 All icons generated successfully!${NC}"

echo -e "\n${BLUE}📋 Generated files:${NC}"
ls -la "$ICONS_DIR"/*.png 2>/dev/null | while read -r line; do
    echo -e "   📄 $line"
done

echo -e "\n${YELLOW}💡 Next steps:${NC}"
echo -e "   1. Test the PWA installation on mobile devices"
echo -e "   2. Verify icons appear correctly in app launchers"
echo -e "   3. Check manifest.json validation"
echo -e "   4. Consider creating maskable icons for better Android support"

echo -e "\n${BLUE}🔧 To use this script:${NC}"
echo -e "   chmod +x scripts/generate-icons-imagemagick.sh"
echo -e "   ./scripts/generate-icons-imagemagick.sh"
