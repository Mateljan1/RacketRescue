// Photo Upload for Completed Work
// Handles before/after photos for orders using Supabase Storage

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface PhotoUploadResult {
  url: string
  path: string
}

// Upload photo to Supabase Storage
export async function uploadOrderPhoto(
  orderId: string,
  file: File,
  photoType: 'before' | 'after'
): Promise<PhotoUploadResult | null> {
  if (!supabase) {
    console.error('[Photo Upload] Supabase not configured')
    return null
  }

  try {
    // Generate unique filename
    const timestamp = Date.now()
    const ext = file.name.split('.').pop()
    const filename = `${orderId}_${photoType}_${timestamp}.${ext}`
    const path = `orders/${orderId}/${filename}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('order-photos')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('[Photo Upload] Upload error:', error)
      return null
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('order-photos')
      .getPublicUrl(path)

    return {
      url: urlData.publicUrl,
      path: path,
    }

  } catch (error) {
    console.error('[Photo Upload] Error:', error)
    return null
  }
}

// Upload multiple photos
export async function uploadOrderPhotos(
  orderId: string,
  files: File[],
  photoType: 'before' | 'after'
): Promise<PhotoUploadResult[]> {
  const results = await Promise.all(
    files.map(file => uploadOrderPhoto(orderId, file, photoType))
  )

  return results.filter((r): r is PhotoUploadResult => r !== null)
}

// Delete photo
export async function deleteOrderPhoto(path: string): Promise<boolean> {
  if (!supabase) return false

  try {
    const { error } = await supabase.storage
      .from('order-photos')
      .remove([path])

    if (error) {
      console.error('[Photo Upload] Delete error:', error)
      return false
    }

    return true

  } catch (error) {
    console.error('[Photo Upload] Delete error:', error)
    return false
  }
}

// Get all photos for an order
export async function getOrderPhotos(orderId: string): Promise<PhotoUploadResult[]> {
  if (!supabase) return []

  try {
    const { data, error } = await supabase.storage
      .from('order-photos')
      .list(`orders/${orderId}`, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'asc' },
      })

    if (error || !data) {
      console.error('[Photo Upload] List error:', error)
      return []
    }

    return data.map(file => ({
      url: supabase.storage.from('order-photos').getPublicUrl(`orders/${orderId}/${file.name}`).data.publicUrl,
      path: `orders/${orderId}/${file.name}`,
    }))

  } catch (error) {
    console.error('[Photo Upload] Get photos error:', error)
    return []
  }
}

// Compress image before upload (reduces file size)
export async function compressImage(file: File, maxWidth: number = 1200): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          } else {
            resolve(file)
          }
        }, 'image/jpeg', 0.85)
      }

      img.src = e.target?.result as string
    }

    reader.readAsDataURL(file)
  })
}

