/**
 * High-level WhatsApp Cloud API Service wrapper
 */
export const whatsappService = {
  get baseUrl() {
    return `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}`
  },

  get headers() {
    return {
      'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    }
  },

  /** Send a simple text message */
  async sendMessage(to: string, text: string) {
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { body: text },
      }),
    })
    return await response.json()
  },

  /** Send a template message */
  async sendTemplate(to: string, templateName: string, languageCode: string = 'en_US', components: any[] = []) {
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: languageCode },
          components,
        },
      }),
    })
    return await response.json()
  },

  /** Verify webhook token */
  verifyToken(token: string) {
    return token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN
  }
}
