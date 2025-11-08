# Icon Generator Script for LegalApp PWA using PowerShell
# 
# This script generates all required PWA icons from the main logo
# using PowerShell with .NET System.Drawing

param(
    [string]$InputLogo = "..\public\LegalApp-logo.png",
    [string]$OutputDir = "..\public\icons"
)

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"
$White = "White"

Write-Host "🎨 LegalApp PWA Icon Generator" -ForegroundColor $Blue
Write-Host "================================" -ForegroundColor $Blue

# Check if input logo exists
$InputPath = Resolve-Path $InputLogo -ErrorAction SilentlyContinue
if (-not $InputPath) {
    Write-Host "❌ Logo file not found: $InputLogo" -ForegroundColor $Red
    Write-Host "   Please make sure LegalApp-logo.png exists in the public folder" -ForegroundColor $Yellow
    exit 1
}

# Create output directory if it doesn't exist
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
    Write-Host "📁 Created icons directory" -ForegroundColor $Green
}

# Icon sizes required by manifest.json
$IconSizes = @(72, 96, 128, 144, 152, 192, 384, 512)

Write-Host "📸 Source logo: $InputPath" -ForegroundColor $Blue

# Load System.Drawing assembly
Add-Type -AssemblyName System.Drawing

try {
    # Load the original image
    $OriginalImage = [System.Drawing.Image]::FromFile($InputPath)
    Write-Host "📏 Logo dimensions: $($OriginalImage.Width)x$($OriginalImage.Height)" -ForegroundColor $Blue
    
    Write-Host "`n🔄 Generating main PWA icons..." -ForegroundColor $Blue
    
    # Generate main PWA icons
    foreach ($size in $IconSizes) {
        $outputFile = Join-Path $OutputDir "icon-${size}x${size}.png"
        
        # Create a new bitmap with the desired size
        $newBitmap = New-Object System.Drawing.Bitmap($size, $size)
        $graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
        
        # Set high quality rendering
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        
        # Clear with transparent background
        $graphics.Clear([System.Drawing.Color]::Transparent)
        
        # Calculate scaling to fit the image within the square while maintaining aspect ratio
        $scaleX = $size / $OriginalImage.Width
        $scaleY = $size / $OriginalImage.Height
        $scale = [Math]::Min($scaleX, $scaleY)
        
        $newWidth = [int]($OriginalImage.Width * $scale)
        $newHeight = [int]($OriginalImage.Height * $scale)
        
        # Center the image
        $x = ($size - $newWidth) / 2
        $y = ($size - $newHeight) / 2
        
        # Draw the resized image
        $graphics.DrawImage($OriginalImage, $x, $y, $newWidth, $newHeight)
        
        # Save the image
        $newBitmap.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)
        
        # Clean up
        $graphics.Dispose()
        $newBitmap.Dispose()
        
        $fileSize = (Get-Item $outputFile).Length / 1KB
        Write-Host "✅ Generated: icon-${size}x${size}.png ($([math]::Round($fileSize, 1)) KB)" -ForegroundColor $Green
    }
    
    Write-Host "`n🔄 Generating shortcut icons..." -ForegroundColor $Blue
    
    # Generate shortcut icons
    $shortcutNames = @("shortcut-sholat.png", "shortcut-qibla.png", "shortcut-quran.png")
    
    foreach ($shortcut in $shortcutNames) {
        $outputFile = Join-Path $OutputDir $shortcut
        
        # Create a new bitmap with 96x96 size
        $newBitmap = New-Object System.Drawing.Bitmap(96, 96)
        $graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
        
        # Set high quality rendering
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        
        # Clear with transparent background
        $graphics.Clear([System.Drawing.Color]::Transparent)
        
        # Calculate scaling to fit the image within 96x96 while maintaining aspect ratio
        $scaleX = 96 / $OriginalImage.Width
        $scaleY = 96 / $OriginalImage.Height
        $scale = [Math]::Min($scaleX, $scaleY)
        
        $newWidth = [int]($OriginalImage.Width * $scale)
        $newHeight = [int]($OriginalImage.Height * $scale)
        
        # Center the image
        $x = (96 - $newWidth) / 2
        $y = (96 - $newHeight) / 2
        
        # Draw the resized image
        $graphics.DrawImage($OriginalImage, $x, $y, $newWidth, $newHeight)
        
        # Save the image
        $newBitmap.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)
        
        # Clean up
        $graphics.Dispose()
        $newBitmap.Dispose()
        
        $fileSize = (Get-Item $outputFile).Length / 1KB
        Write-Host "✅ Generated: $shortcut ($([math]::Round($fileSize, 1)) KB)" -ForegroundColor $Green
    }
    
    Write-Host "`n🔄 Generating favicon..." -ForegroundColor $Blue
    
    # Generate favicon
    $faviconPath = Join-Path (Split-Path $OutputDir -Parent) "favicon.png"
    
    $newBitmap = New-Object System.Drawing.Bitmap(32, 32)
    $graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
    
    # Set high quality rendering
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    # Clear with transparent background
    $graphics.Clear([System.Drawing.Color]::Transparent)
    
    # Calculate scaling to fit the image within 32x32 while maintaining aspect ratio
    $scaleX = 32 / $OriginalImage.Width
    $scaleY = 32 / $OriginalImage.Height
    $scale = [Math]::Min($scaleX, $scaleY)
    
    $newWidth = [int]($OriginalImage.Width * $scale)
    $newHeight = [int]($OriginalImage.Height * $scale)
    
    # Center the image
    $x = (32 - $newWidth) / 2
    $y = (32 - $newHeight) / 2
    
    # Draw the resized image
    $graphics.DrawImage($OriginalImage, $x, $y, $newWidth, $newHeight)
    
    # Save the image
    $newBitmap.Save($faviconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Clean up
    $graphics.Dispose()
    $newBitmap.Dispose()
    
    $fileSize = (Get-Item $faviconPath).Length / 1KB
    Write-Host "✅ Generated: favicon.png ($([math]::Round($fileSize, 1)) KB)" -ForegroundColor $Green
    
    Write-Host "`n🔄 Generating Apple touch icon..." -ForegroundColor $Blue
    
    # Generate Apple touch icon
    $appleTouchIcon = Join-Path $OutputDir "apple-touch-icon.png"
    
    $newBitmap = New-Object System.Drawing.Bitmap(180, 180)
    $graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
    
    # Set high quality rendering
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    # Clear with transparent background
    $graphics.Clear([System.Drawing.Color]::Transparent)
    
    # Calculate scaling to fit the image within 180x180 while maintaining aspect ratio
    $scaleX = 180 / $OriginalImage.Width
    $scaleY = 180 / $OriginalImage.Height
    $scale = [Math]::Min($scaleX, $scaleY)
    
    $newWidth = [int]($OriginalImage.Width * $scale)
    $newHeight = [int]($OriginalImage.Height * $scale)
    
    # Center the image
    $x = (180 - $newWidth) / 2
    $y = (180 - $newHeight) / 2
    
    # Draw the resized image
    $graphics.DrawImage($OriginalImage, $x, $y, $newWidth, $newHeight)
    
    # Save the image
    $newBitmap.Save($appleTouchIcon, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Clean up
    $graphics.Dispose()
    $newBitmap.Dispose()
    
    $fileSize = (Get-Item $appleTouchIcon).Length / 1KB
    Write-Host "✅ Generated: apple-touch-icon.png ($([math]::Round($fileSize, 1)) KB)" -ForegroundColor $Green
    
    # Clean up original image
    $OriginalImage.Dispose()
    
    Write-Host "`n🎉 All icons generated successfully!" -ForegroundColor $Green
    
    Write-Host "`n📋 Generated files:" -ForegroundColor $Blue
    Get-ChildItem $OutputDir -Filter "*.png" | ForEach-Object {
        $fileSize = $_.Length / 1KB
        Write-Host "   📄 $($_.Name) ($([math]::Round($fileSize, 1)) KB)" -ForegroundColor $White
    }
    
    Write-Host "`n💡 Next steps:" -ForegroundColor $Yellow
    Write-Host "   1. Test the PWA installation on mobile devices" -ForegroundColor $White
    Write-Host "   2. Verify icons appear correctly in app launchers" -ForegroundColor $White
    Write-Host "   3. Check manifest.json validation" -ForegroundColor $White
    Write-Host "   4. Consider creating maskable icons for better Android support" -ForegroundColor $White
    
    Write-Host "`n🔧 To use this script:" -ForegroundColor $Blue
    Write-Host "   .\scripts\generate-icons.ps1" -ForegroundColor $White
    
} catch {
    Write-Host "❌ Error generating icons: $($_.Exception.Message)" -ForegroundColor $Red
    exit 1
}
