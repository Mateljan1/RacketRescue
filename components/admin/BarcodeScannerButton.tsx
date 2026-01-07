'use client'

import { useState } from 'react'
import { Camera, Scan } from 'lucide-react'
import { scanRacketBarcode, lookupRacketByBarcode, isCameraAvailable } from '@/lib/utils/barcode-scanner'

interface BarcodeScannerButtonProps {
  onScanComplete: (racketData: any) => void
}

export default function BarcodeScannerButton({ onScanComplete }: BarcodeScannerButtonProps) {
  const [scanning, setScanning] = useState(false)
  const [manualEntry, setManualEntry] = useState(false)
  const [barcode, setBarcode] = useState('')

  const handleScan = async () => {
    setScanning(true)
    try {
      const barcodeData = await scanRacketBarcode()
      
      if (barcodeData) {
        // Lookup racket details
        const racketData = await lookupRacketByBarcode(barcodeData)
        
        if (racketData) {
          onScanComplete(racketData)
        } else {
          alert('Racket not found in database. Please enter details manually.')
        }
      }
    } catch (error) {
      console.error('Scan error:', error)
      alert('Failed to scan barcode. Please try again.')
    } finally {
      setScanning(false)
    }
  }

  const handleManualEntry = async () => {
    if (!barcode.trim()) return

    try {
      const racketData = await lookupRacketByBarcode(barcode)
      
      if (racketData) {
        onScanComplete(racketData)
        setManualEntry(false)
        setBarcode('')
      } else {
        alert('Racket not found. Please check the barcode and try again.')
      }
    } catch (error) {
      console.error('Lookup error:', error)
    }
  }

  if (!isCameraAvailable()) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          Barcode scanning available in mobile app only
        </p>
      </div>
    )
  }

  if (manualEntry) {
    return (
      <div className="space-y-3">
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter barcode manually..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-racket-red/20"
        />
        <div className="flex gap-2">
          <button
            onClick={handleManualEntry}
            className="flex-1 px-4 py-2 bg-racket-red text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Lookup
          </button>
          <button
            onClick={() => {
              setManualEntry(false)
              setBarcode('')
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleScan}
        disabled={scanning}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-racket-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {scanning ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Camera className="w-5 h-5" />
        )}
        <span>{scanning ? 'Scanning...' : 'Scan Barcode'}</span>
      </button>
      <button
        onClick={() => setManualEntry(true)}
        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Scan className="w-5 h-5" />
      </button>
    </div>
  )
}
