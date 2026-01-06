// SMS Notification System using Twilio
// Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER to env vars

export interface NotificationPayload {
  to: string
  message: string
  orderId?: string
  trackingUrl?: string
}

export const sendSMS = async (payload: NotificationPayload) => {
  // TODO: Integrate with Twilio API
  console.log('SMS would be sent:', payload)
  
  /*
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_PHONE_NUMBER

  const client = require('twilio')(accountSid, authToken)

  await client.messages.create({
    body: payload.message,
    from: fromNumber,
    to: payload.to,
  })
  */
}

// Pre-built message templates
export const NotificationTemplates = {
  orderPlaced: (orderNumber: string) =>
    `🎾 Order #${orderNumber} confirmed! We&apos;ll pick up your racket soon. Track: racketrescue.com/track/${orderNumber}`,

  pickedUp: (orderNumber: string, eta: string) =>
    `✅ We picked up your racket! Being strung now. Estimated delivery: ${eta}. Track: racketrescue.com/track/${orderNumber}`,

  inProgress: (orderNumber: string, stringer: string) =>
    `🎯 Your racket is being strung by ${stringer}. We&apos;ll update you when it&apos;s ready!`,

  qualityCheck: (orderNumber: string) =>
    `✨ Quality check complete! Your racket is tournament-ready. Out for delivery soon.`,

  outForDelivery: (orderNumber: string, eta: string) =>
    `🚚 Your racket is out for delivery! ETA: ${eta}. Track: racketrescue.com/track/${orderNumber}`,

  delivered: (orderNumber: string) =>
    `🎉 Delivered! Your racket is ready to play. Rate your experience: racketrescue.com/review/${orderNumber}`,

  restringReminder: (racketName: string, daysSince: number) =>
    `⏰ Your ${racketName} was strung ${daysSince} days ago. Time for fresh strings? Book now: racketrescue.com/schedule`,
}

// Send notification based on order status
export const sendOrderStatusNotification = async (
  phone: string,
  orderNumber: string,
  status: string,
  additionalInfo?: { eta?: string; stringer?: string }
) => {
  let message = ''

  switch (status) {
    case 'pending':
      message = NotificationTemplates.orderPlaced(orderNumber)
      break
    case 'picked_up':
      message = NotificationTemplates.pickedUp(orderNumber, additionalInfo?.eta || 'TBD')
      break
    case 'in_progress':
      message = NotificationTemplates.inProgress(orderNumber, additionalInfo?.stringer || 'our team')
      break
    case 'quality_check':
      message = NotificationTemplates.qualityCheck(orderNumber)
      break
    case 'out_for_delivery':
      message = NotificationTemplates.outForDelivery(orderNumber, additionalInfo?.eta || 'soon')
      break
    case 'delivered':
      message = NotificationTemplates.delivered(orderNumber)
      break
  }

  if (message) {
    await sendSMS({
      to: phone,
      message,
      orderId: orderNumber,
      trackingUrl: `https://racketrescue.com/track/${orderNumber}`,
    })
  }
}
