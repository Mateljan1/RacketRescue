// Server-side Google Ads conversion tracking
// Sends purchase events from Stripe webhook for accurate attribution

interface ConversionData {
  conversionAction: string // 'AW-CONVERSION_ID/CONVERSION_LABEL'
  conversionDateTime: string // ISO 8601 format
  conversionValue: number
  currencyCode: string
  orderId: string
  gclid?: string // From URL parameter, stored in order metadata
  userAgent?: string
}

export async function sendGoogleAdsConversion(data: ConversionData): Promise<boolean> {
  const GOOGLE_ADS_CONVERSION_ID = process.env.GOOGLE_ADS_CONVERSION_ID
  const GOOGLE_ADS_CONVERSION_LABEL = process.env.GOOGLE_ADS_CONVERSION_LABEL
  
  if (!GOOGLE_ADS_CONVERSION_ID || !GOOGLE_ADS_CONVERSION_LABEL) {
    console.warn('[Google Ads] Conversion tracking not configured')
    return false
  }
  
  try {
    // Use Google Ads API (requires OAuth setup) or gtag server-side
    // For now, using gtag.js server-side conversion tracking
    
    const conversionPayload = {
      send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      value: data.conversionValue,
      currency: data.currencyCode,
      transaction_id: data.orderId,
      ...(data.gclid && { gclid: data.gclid }),
    }
    
    // Send via Google Ads API
    const response = await fetch(
      `https://www.googleadservices.com/pagead/conversion/${GOOGLE_ADS_CONVERSION_ID}/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversionPayload),
      }
    )
    
    if (!response.ok) {
      throw new Error(`Google Ads API error: ${response.status}`)
    }
    
    console.log('[Google Ads] Conversion tracked:', data.orderId)
    return true
    
  } catch (error) {
    console.error('[Google Ads] Conversion tracking failed:', error)
    return false
  }
}

