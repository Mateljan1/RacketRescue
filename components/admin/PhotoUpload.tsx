'use client'

import { useState } from 'react'
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react'
import { uploadOrderPhoto, compressImage } from '@/lib/utils/photo-upload'
import Image from 'next/image'

interface PhotoUploadProps {
  orderId: string
  photoType: 'before' | 'after'
  existingPhotos?: string[]
  onUploadComplete: (url: string) => void
}

export default function PhotoUpload({ orderId, photoType, existingPhotos = [], onUploadComplete }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [photos, setPhotos] = useState<string[]>(existingPhotos)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const file = files[0]
      
      // Compress image
      const compressedFile = await compressImage(file)
      
      // Upload to Supabase
      const result = await uploadOrderPhoto(orderId, compressedFile, photoType)
      
      if (result) {
        setPhotos([...photos, result.url])
        onUploadComplete(result.url)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload photo. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 capitalize">{photoType} Photos</h4>
        <label className="flex items-center gap-2 px-4 py-2 bg-racket-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
          {uploading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>{uploading ? 'Uploading...' : 'Upload Photo'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photoUrl, index) => (
            <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
              <Image
                src={photoUrl}
                alt={`${photoType} photo ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No {photoType} photos yet</p>
        </div>
      )}
    </div>
  )
}
