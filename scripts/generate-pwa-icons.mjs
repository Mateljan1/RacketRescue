#!/usr/bin/env node

/**
 * Generate PWA icons for Racket Rescue
 * Creates all required PNG sizes for iOS, Android, and web
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ICONS_DIR = path.join(__dirname, '../public/icons')
const PUBLIC_DIR = path.join(__dirname, '../public')

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512]

// Create a tennis racket icon SVG with RR branding
const createIconSvg = (size, maskable = false) => {
  // For maskable icons, we need safe zone (80% of icon is safe)
  const padding = maskable ? Math.floor(size * 0.1) : 0
  const innerSize = size - (padding * 2)

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="#ec1f27"/>

  <g transform="translate(${padding}, ${padding})">
    <!-- Racket head outline -->
    <ellipse cx="${innerSize/2}" cy="${innerSize * 0.38}"
             rx="${innerSize * 0.28}" ry="${innerSize * 0.32}"
             fill="none" stroke="white" stroke-width="${Math.max(3, innerSize * 0.035)}"/>

    <!-- Racket handle -->
    <rect x="${innerSize * 0.42}" y="${innerSize * 0.62}"
          width="${innerSize * 0.16}" height="${innerSize * 0.30}"
          rx="${innerSize * 0.04}" fill="white"/>

    <!-- Handle grip lines -->
    <line x1="${innerSize * 0.44}" y1="${innerSize * 0.70}"
          x2="${innerSize * 0.56}" y2="${innerSize * 0.70}"
          stroke="#ec1f27" stroke-width="${Math.max(1, innerSize * 0.015)}"/>
    <line x1="${innerSize * 0.44}" y1="${innerSize * 0.78}"
          x2="${innerSize * 0.56}" y2="${innerSize * 0.78}"
          stroke="#ec1f27" stroke-width="${Math.max(1, innerSize * 0.015)}"/>
    <line x1="${innerSize * 0.44}" y1="${innerSize * 0.86}"
          x2="${innerSize * 0.56}" y2="${innerSize * 0.86}"
          stroke="#ec1f27" stroke-width="${Math.max(1, innerSize * 0.015)}"/>

    <!-- Cross strings (horizontal) -->
    <line x1="${innerSize * 0.28}" y1="${innerSize * 0.22}"
          x2="${innerSize * 0.72}" y2="${innerSize * 0.22}"
          stroke="white" stroke-width="${Math.max(1, innerSize * 0.018)}" opacity="0.9"/>
    <line x1="${innerSize * 0.25}" y1="${innerSize * 0.32}"
          x2="${innerSize * 0.75}" y2="${innerSize * 0.32}"
          stroke="white" stroke-width="${Math.max(1, innerSize * 0.018)}" opacity="0.9"/>
    <line x1="${innerSize * 0.24}" y1="${innerSize * 0.42}"
          x2="${innerSize * 0.76}" y2="${innerSize * 0.42}"
          stroke="white" stroke-width="${Math.max(1, innerSize * 0.018)}" opacity="0.9"/>
    <line x1="${innerSize * 0.27}" y1="${innerSize * 0.52}"
          x2="${innerSize * 0.73}" y2="${innerSize * 0.52}"
          stroke="white" stroke-width="${Math.max(1, innerSize * 0.018)}" opacity="0.9"/>

    <!-- Main strings (vertical) -->
    <line x1="${innerSize * 0.35}" y1="${innerSize * 0.10}"
          x2="${innerSize * 0.35}" y2="${innerSize * 0.60}"
          stroke="white" stroke-width="${Math.max(1, innerSize * 0.018)}" opacity="0.9"/>
    <line x1="${innerSize * 0.50}" y1="${innerSize * 0.07}"
          x2="${innerSize * 0.50}" y2="${innerSize * 0.62}"
          stroke="white" stroke-width="${Math.max(1, innerSize * 0.018)}" opacity="0.9"/>
    <line x1="${innerSize * 0.65}" y1="${innerSize * 0.10}"
          x2="${innerSize * 0.65}" y2="${innerSize * 0.60}"
          stroke="white" stroke-width="${Math.max(1, innerSize * 0.018)}" opacity="0.9"/>
  </g>
</svg>`)
}

async function generateIcons() {
  console.log('🎾 Generating Racket Rescue PWA icons...\n')

  // Ensure directories exist
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true })
  }

  // Generate regular icons
  for (const size of sizes) {
    const svg = createIconSvg(size, false)
    const outputPath = path.join(ICONS_DIR, `icon-${size}.png`)

    await sharp(svg)
      .png()
      .toFile(outputPath)

    console.log(`✅ Created: icon-${size}.png`)
  }

  // Generate maskable icons (for Android adaptive icons)
  for (const size of [192, 512]) {
    const svg = createIconSvg(size, true)
    const outputPath = path.join(ICONS_DIR, `icon-maskable-${size}.png`)

    await sharp(svg)
      .png()
      .toFile(outputPath)

    console.log(`✅ Created: icon-maskable-${size}.png`)
  }

  // Generate apple-touch-icon (180x180)
  const appleSvg = createIconSvg(180, false)
  await sharp(appleSvg)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'))
  console.log(`✅ Created: apple-touch-icon.png`)

  // Generate favicon (32x32)
  const faviconSvg = createIconSvg(32, false)
  await sharp(faviconSvg)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon.png'))
  console.log(`✅ Created: favicon.png`)

  // Generate favicon.ico (use 32x32 as base)
  await sharp(faviconSvg)
    .resize(32, 32)
    .toFile(path.join(PUBLIC_DIR, 'favicon.ico'))
  console.log(`✅ Created: favicon.ico`)

  console.log('\n🎉 All PWA icons generated successfully!')
}

generateIcons().catch(console.error)
