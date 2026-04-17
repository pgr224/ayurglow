import {
  getLoginAttemptStatus,
  isAuthSessionActive,
  registerFailedLoginAttempt,
  resetLoginAttempts,
  setAuthSession,
} from './auth-session'

export function setUserLoggedIn(value: boolean) {
  setAuthSession('user', value)
  if (!value) {
    resetLoginAttempts('user')
  }
}

export function isUserLoggedIn() {
  return isAuthSessionActive('user')
}

export function getUserLoginAttemptStatus() {
  return getLoginAttemptStatus('user')
}

export function registerUserFailedLoginAttempt() {
  return registerFailedLoginAttempt('user')
}

export function clearUserLoginAttempts() {
  resetLoginAttempts('user')
}