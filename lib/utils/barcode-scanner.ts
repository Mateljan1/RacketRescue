// Barcode Scanner for Rackets
// Uses Capacitor Camera API to scan barcodes and auto-fill racket details

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { Capacitor } from '@capacitor/core'

export interface RacketBarcodeData {
  brand: string
  model: string
  serialNumber: string
  gripSize?: string
  stringPattern?: string
}

// Check if camera is available
export function isCameraAvailable(): boolean {
  return Capacitor.isNativePlatform()
}

// Scan barcode using camera
export async function scanRacketBarcode(): Promise<string | null> {
  if (!isCameraAvailable()) {
    console.log('[Barcode] Camera not available on web')
    return null
  }

  try {
    // Request camera permission
    const permissions = await Camera.requestPermissions()
    
    if (permissions.camera !== 'granted') {
      console.log('[Barcode] Camera permission denied')
      return null
    }

    // Take photo
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90,
      allowEditing: false,
    })

    // In production, you'd use a barcode scanning library like:
    // - @capacitor-community/barcode-scanner
    // - Or send image to backend for processing
    
    console.log('[Barcode] Photo captured:', photo.webPath)
    
    // Placeholder: Return mock barcode
    // In production, process the image to extract barcode
    return photo.webPath || null

  } catch (error) {
    console.error('[Barcode] Scan error:', error)
    return null
  }
}

// Parse barcode data (placeholder - would use actual barcode library)
export function parseRacketBarcode(barcodeData: string): RacketBarcodeData | null {
  // Placeholder: In production, parse actual barcode format
  // Different brands use different barcode formats
  
  // Example Wilson barcode: WRT73391U2 (model code)
  // Example Babolat barcode: 101449 (model code)
  
  // For now, return null - this would be implemented with actual barcode parsing
  console.log('[Barcode] Would parse:', barcodeData)
  
  return null
}

// Lookup racket details by barcode (from database or API)
export async function lookupRacketByBarcode(barcode: string): Promise<RacketBarcodeData | null> {
  try {
    const response = await fetch(`/api/rackets/lookup?barcode=${encodeURIComponent(barcode)}`)
    
    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.racket || null

  } catch (error) {
    console.error('[Barcode] Lookup error:', error)
    return null
  }
}

// Manual barcode entry (fallback if camera not available)
export async function manualBarcodeEntry(barcode: string): Promise<RacketBarcodeData | null> {
  return lookupRacketByBarcode(barcode)
}

