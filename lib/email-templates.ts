import fs from 'fs'
import path from 'path'

export interface OrderConfirmationData {
  customerName: string
  orderNumber: string
  serviceName: string
  stringType: string
  addons: string
  pickupTime: string
  pickupAddress: string
  orderTotal: string
  deliveryDate: string
  trackingUrl?: string
}

/**
 * Generates the order confirmation email HTML with populated data
 */
export function generateOrderConfirmationEmail(data: OrderConfirmationData): string {
  // In production, you'd read the template file
  // For now, we'll use inline template with placeholders

  const template = getOrderConfirmationTemplate()

  return template
    .replace(/\{\{CUSTOMER_NAME\}\}/g, data.customerName)
    .replace(/\{\{ORDER_NUMBER\}\}/g, data.orderNumber)
    .replace(/\{\{SERVICE_NAME\}\}/g, data.serviceName)
    .replace(/\{\{STRING_TYPE\}\}/g, data.stringType)
    .replace(/\{\{ADDONS\}\}/g, data.addons || 'None')
    .replace(/\{\{PICKUP_TIME\}\}/g, data.pickupTime)
    .replace(/\{\{PICKUP_ADDRESS\}\}/g, data.pickupAddress)
    .replace(/\{\{ORDER_TOTAL\}\}/g, data.orderTotal)
    .replace(/\{\{DELIVERY_DATE\}\}/g, data.deliveryDate)
    .replace(/\{\{TRACKING_URL\}\}/g, data.trackingUrl || 'https://racketrescue.com/track')
}

/**
 * Get the order confirmation email template
 * In production, this would read from the HTML file
 */
function getOrderConfirmationTemplate(): string {
  try {
    const templatePath = path.join(process.cwd(), 'emails', 'order-confirmation.html')
    return fs.readFileSync(templatePath, 'utf-8')
  } catch {
    // Fallback to inline template if file not found
    return getInlineTemplate()
  }
}

/**
 * Inline template as fallback
 */
function getInlineTemplate(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Racket Rescue Order Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 40px 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #EC1F27 0%, #c91920 100%); padding: 40px 30px; text-align: center; color: #fff; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 40px 30px; }
    .order-box { background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 24px; margin: 24px 0; }
    .delivery-box { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #10b981; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center; }
    .delivery-date { font-size: 24px; font-weight: 700; color: #047857; }
    .cta-button { display: inline-block; background: #EC1F27; color: #fff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; }
    .footer { background: #030707; padding: 32px; text-align: center; color: #fff; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size: 48px;">📦</div>
      <h1>We're Rescuing Your Racket!</h1>
      <p>Order confirmed — your pickup is scheduled</p>
    </div>
    <div class="content">
      <p>Hi {{CUSTOMER_NAME}},</p>
      <p>Great news! Your racket rescue request has been confirmed.</p>
      <div class="order-box">
        <h2>🎾 Order Details</h2>
        <p><strong>Order:</strong> #{{ORDER_NUMBER}}</p>
        <p><strong>Service:</strong> {{SERVICE_NAME}}</p>
        <p><strong>String:</strong> {{STRING_TYPE}}</p>
        <p><strong>Add-ons:</strong> {{ADDONS}}</p>
        <p><strong>Pickup:</strong> {{PICKUP_TIME}}</p>
        <p><strong>Address:</strong> {{PICKUP_ADDRESS}}</p>
        <p><strong>Total:</strong> \${{ORDER_TOTAL}}</p>
      </div>
      <div class="delivery-box">
        <h3>🚗 Estimated Delivery</h3>
        <p class="delivery-date">{{DELIVERY_DATE}}</p>
      </div>
      <div style="text-align: center; margin: 32px 0;">
        <a href="{{TRACKING_URL}}" class="cta-button">🔍 Track Your Racket</a>
      </div>
    </div>
    <div class="footer">
      <div style="font-size: 32px;">🎾</div>
      <p style="font-weight: 700; margin: 8px 0;">Racket Rescue</p>
      <p style="opacity: 0.7;">We Save Your Game!</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Example usage for API routes
 */
export function createOrderConfirmationPayload(order: {
  customer: { name: string; email: string }
  service: { name: string; price: number }
  stringType: string
  addons: string[]
  pickup: { date: string; time: string; address: string }
}): { to: string; subject: string; html: string } {
  const orderNumber = `RR-${Date.now().toString(36).toUpperCase()}`

  // Calculate delivery date (24h for standard, same-day for rush)
  const pickupDate = new Date(order.pickup.date)
  const isRush = order.service.name.toLowerCase().includes('rush')
  const deliveryDate = new Date(pickupDate)
  if (!isRush) {
    deliveryDate.setDate(deliveryDate.getDate() + 1)
  }

  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const addonsTotal = order.addons.reduce((sum, addon) => {
    if (addon.includes('Grip')) return sum + 5
    if (addon.includes('Clean')) return sum + 10
    return sum
  }, 0)

  const html = generateOrderConfirmationEmail({
    customerName: order.customer.name,
    orderNumber,
    serviceName: order.service.name,
    stringType: order.stringType,
    addons: order.addons.length > 0 ? order.addons.join(', ') : 'None',
    pickupTime: `${order.pickup.date} - ${order.pickup.time}`,
    pickupAddress: order.pickup.address,
    orderTotal: (order.service.price + addonsTotal).toFixed(2),
    deliveryDate: formattedDeliveryDate,
    trackingUrl: `https://racketrescue.com/track/${orderNumber}`,
  })

  return {
    to: order.customer.email,
    subject: `📦 Order Confirmed - Your Racket Rescue #${orderNumber}`,
    html,
  }
}
