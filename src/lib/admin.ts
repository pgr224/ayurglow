import {
  getLoginAttemptStatus,
  isAuthSessionActive,
  registerFailedLoginAttempt,
  resetLoginAttempts,
  setAuthSession,
} from './auth-session'

export const DEMO_ADMIN_EMAIL = 'admin@aayurglow.com'
export const DEMO_ADMIN_PASSWORD = 'Admin@1234'

export function validateAdminLogin(email: string, password: string) {
  return email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD
}

export function setAdminLoggedIn(value: boolean) {
  setAuthSession('admin', value)
  if (!value) {
    resetLoginAttempts('admin')
  }
}

export function isAdminLoggedIn() {
  return isAuthSessionActive('admin')
}

export function getAdminLoginAttemptStatus() {
  return getLoginAttemptStatus('admin')
}

export function registerAdminFailedLoginAttempt() {
  return registerFailedLoginAttempt('admin')
}

export function clearAdminLoginAttempts() {
  resetLoginAttempts('admin')
}
