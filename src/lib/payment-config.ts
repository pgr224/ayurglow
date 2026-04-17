// ─── Payment Provider Configuration ─────────────────────────────────
// Stores payment gateway settings. In production, this would be in DB.
// For now, we use localStorage on admin side + a shared config.

export interface PaymentProvider {
  id: string
  name: string
  description: string
  icon: string            // emoji
  enabled: boolean
  comingSoon: boolean
  fields: PaymentField[]  // admin-configurable keys
}

export interface PaymentField {
  key: string
  label: string
  placeholder: string
  type: 'text' | 'password'
  value: string
}

export const UPI_APPS = [
  { id: 'gpay',    name: 'Google Pay',  icon: '💳', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'phonepe', name: 'PhonePe',     icon: '💜', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'paytm',   name: 'Paytm',       icon: '💙', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  { id: 'upi',     name: 'Other UPI',   icon: '📱', color: 'bg-green-50 text-green-700 border-green-200' },
]

export const DEFAULT_PAYMENT_PROVIDERS: PaymentProvider[] = [
  {
    id: 'upi',
    name: 'UPI',
    description: 'Accept payments via Google Pay, PhonePe, Paytm and all UPI apps. No integration needed — just enter your UPI ID.',
    icon: '📱',
    enabled: true,
    comingSoon: false,
    fields: [
      { key: 'upi_id', label: 'UPI ID', placeholder: 'yourname@upi', type: 'text', value: '' },
      { key: 'upi_name', label: 'Merchant Name', placeholder: 'AyurGlow Aesthetics', type: 'text', value: 'AyurGlow Aesthetics' },
    ],
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Allow customers to pay at doorstep. No API keys required.',
    icon: '💵',
    enabled: true,
    comingSoon: false,
    fields: [
      { key: 'cod_extra_charge', label: 'Extra COD Charge (₹)', placeholder: '0', type: 'text', value: '40' },
    ],
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    description: 'Full-featured payment gateway supporting cards, UPI, netbanking, wallets. Get your keys from dashboard.razorpay.com.',
    icon: '⚡',
    enabled: false,
    comingSoon: true,
    fields: [
      { key: 'razorpay_key_id', label: 'Key ID', placeholder: 'rzp_live_xxxx', type: 'text', value: '' },
      { key: 'razorpay_key_secret', label: 'Key Secret', placeholder: 'Enter secret key', type: 'password', value: '' },
      { key: 'razorpay_webhook_secret', label: 'Webhook Secret (Optional)', placeholder: 'whsec_xxx', type: 'password', value: '' },
    ],
  },
  {
    id: 'cashfree',
    name: 'Cashfree',
    description: 'Cashfree Payments for seamless online collections with UPI, cards, wallets, netbanking.',
    icon: '🏦',
    enabled: false,
    comingSoon: true,
    fields: [
      { key: 'cashfree_app_id', label: 'App ID', placeholder: 'Enter App ID', type: 'text', value: '' },
      { key: 'cashfree_secret_key', label: 'Secret Key', placeholder: 'Enter Secret Key', type: 'password', value: '' },
    ],
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Global payment platform with advanced fraud protection. Ideal for international customers.',
    icon: '🔵',
    enabled: false,
    comingSoon: true,
    fields: [
      { key: 'stripe_publishable_key', label: 'Publishable Key', placeholder: 'pk_live_xxxx', type: 'text', value: '' },
      { key: 'stripe_secret_key', label: 'Secret Key', placeholder: 'sk_live_xxxx', type: 'password', value: '' },
    ],
  },
  {
    id: 'payu',
    name: 'PayU',
    description: 'India-focused payment gateway supporting multiple payment modes. Popular with Indian merchants.',
    icon: '🟢',
    enabled: false,
    comingSoon: true,
    fields: [
      { key: 'payu_merchant_key', label: 'Merchant Key', placeholder: 'Enter Merchant Key', type: 'text', value: '' },
      { key: 'payu_merchant_salt', label: 'Merchant Salt', placeholder: 'Enter Salt', type: 'password', value: '' },
    ],
  },
]

// ─── LocalStorage helpers for admin settings ────────────────────────
const PAYMENT_SETTINGS_KEY = 'ayurglow_payment_settings'

export function getPaymentSettings(): PaymentProvider[] {
  if (typeof window === 'undefined') return DEFAULT_PAYMENT_PROVIDERS
  try {
    const raw = localStorage.getItem(PAYMENT_SETTINGS_KEY)
    if (raw) return JSON.parse(raw) as PaymentProvider[]
    return DEFAULT_PAYMENT_PROVIDERS
  } catch {
    return DEFAULT_PAYMENT_PROVIDERS
  }
}

export function savePaymentSettings(providers: PaymentProvider[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PAYMENT_SETTINGS_KEY, JSON.stringify(providers))
}

export function getEnabledProviders(): PaymentProvider[] {
  return getPaymentSettings().filter(p => p.enabled && !p.comingSoon)
}

export function getUpiId(): string {
  const providers = getPaymentSettings()
  const upi = providers.find(p => p.id === 'upi')
  return upi?.fields.find(f => f.key === 'upi_id')?.value || ''
}

export function getMerchantName(): string {
  const providers = getPaymentSettings()
  const upi = providers.find(p => p.id === 'upi')
  return upi?.fields.find(f => f.key === 'upi_name')?.value || 'AyurGlow'
}

export function getCodExtraCharge(): number {
  const providers = getPaymentSettings()
  const cod = providers.find(p => p.id === 'cod')
  const val = cod?.fields.find(f => f.key === 'cod_extra_charge')?.value || '0'
  return parseFloat(val) || 0
}
