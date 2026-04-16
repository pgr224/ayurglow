export const DEMO_ADMIN_EMAIL = 'admin@aayurglow.com'
export const DEMO_ADMIN_PASSWORD = 'Admin@1234'
export const ADMIN_AUTH_KEY = 'aayurglow_admin_authenticated'

export function validateAdminLogin(email: string, password: string) {
  return email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD
}

export function setAdminLoggedIn(value: boolean) {
  if (typeof window === 'undefined') return
  if (value) {
    window.localStorage.setItem(ADMIN_AUTH_KEY, 'true')
  } else {
    window.localStorage.removeItem(ADMIN_AUTH_KEY)
  }
}

export function isAdminLoggedIn() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(ADMIN_AUTH_KEY) === 'true'
}
