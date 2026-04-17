type AuthRole = 'admin' | 'user'

interface SessionPayload {
  authenticatedAt: number
  lastActivityAt: number
  expiresAt: number
}

interface LoginAttemptPayload {
  count: number
  firstAttemptAt: number
  lockoutUntil: number | null
}

interface RoleConfig {
  sessionTimeoutMs: number
  maxAttempts: number
  attemptWindowMs: number
  lockoutMs: number
}

interface AttemptStatus {
  isLocked: boolean
  remainingAttempts: number
  lockoutRemainingMs: number
}

const ROLE_CONFIG: Record<AuthRole, RoleConfig> = {
  admin: {
    sessionTimeoutMs: 30 * 60 * 1000,
    maxAttempts: 5,
    attemptWindowMs: 15 * 60 * 1000,
    lockoutMs: 15 * 60 * 1000,
  },
  user: {
    sessionTimeoutMs: 7 * 24 * 60 * 60 * 1000,
    maxAttempts: 8,
    attemptWindowMs: 15 * 60 * 1000,
    lockoutMs: 10 * 60 * 1000,
  },
}

const SESSION_STORAGE_PREFIX = 'aayurglow_auth_session_'
const ATTEMPT_STORAGE_PREFIX = 'aayurglow_auth_attempts_'

function canUseStorage() {
  return typeof window !== 'undefined'
}

function getSessionKey(role: AuthRole) {
  return `${SESSION_STORAGE_PREFIX}${role}`
}

function getAttemptKey(role: AuthRole) {
  return `${ATTEMPT_STORAGE_PREFIX}${role}`
}

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) return null

  const raw = window.localStorage.getItem(key)
  if (!raw) return null

  try {
    return JSON.parse(raw) as T
  } catch {
    window.localStorage.removeItem(key)
    return null
  }
}

function writeJson(key: string, value: unknown) {
  if (!canUseStorage()) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function clearKey(key: string) {
  if (!canUseStorage()) return
  window.localStorage.removeItem(key)
}

function createSessionPayload(role: AuthRole, now: number): SessionPayload {
  const timeout = ROLE_CONFIG[role].sessionTimeoutMs
  return {
    authenticatedAt: now,
    lastActivityAt: now,
    expiresAt: now + timeout,
  }
}

export function setAuthSession(role: AuthRole, active: boolean) {
  if (!canUseStorage()) return

  if (!active) {
    clearKey(getSessionKey(role))
    return
  }

  const now = Date.now()
  writeJson(getSessionKey(role), createSessionPayload(role, now))
}

export function clearAuthSession(role: AuthRole) {
  clearKey(getSessionKey(role))
}

export function isAuthSessionActive(role: AuthRole) {
  const now = Date.now()
  const payload = readJson<SessionPayload>(getSessionKey(role))
  if (!payload) return false

  if (typeof payload.expiresAt !== 'number' || now >= payload.expiresAt) {
    clearAuthSession(role)
    return false
  }

  // Sliding expiration: extend session while user is active.
  const refreshed: SessionPayload = {
    ...payload,
    lastActivityAt: now,
    expiresAt: now + ROLE_CONFIG[role].sessionTimeoutMs,
  }
  writeJson(getSessionKey(role), refreshed)

  return true
}

export function getSessionRemainingMs(role: AuthRole) {
  const payload = readJson<SessionPayload>(getSessionKey(role))
  if (!payload || typeof payload.expiresAt !== 'number') return 0
  return Math.max(0, payload.expiresAt - Date.now())
}

function clearLoginAttempts(role: AuthRole) {
  clearKey(getAttemptKey(role))
}

export function resetLoginAttempts(role: AuthRole) {
  clearLoginAttempts(role)
}

export function getLoginAttemptStatus(role: AuthRole): AttemptStatus {
  const now = Date.now()
  const config = ROLE_CONFIG[role]
  const payload = readJson<LoginAttemptPayload>(getAttemptKey(role))

  if (!payload) {
    return {
      isLocked: false,
      remainingAttempts: config.maxAttempts,
      lockoutRemainingMs: 0,
    }
  }

  const lockoutUntil = typeof payload.lockoutUntil === 'number' ? payload.lockoutUntil : null
  if (lockoutUntil && lockoutUntil > now) {
    return {
      isLocked: true,
      remainingAttempts: 0,
      lockoutRemainingMs: lockoutUntil - now,
    }
  }

  if (now - payload.firstAttemptAt > config.attemptWindowMs) {
    clearLoginAttempts(role)
    return {
      isLocked: false,
      remainingAttempts: config.maxAttempts,
      lockoutRemainingMs: 0,
    }
  }

  const attemptsUsed = Math.max(0, payload.count)
  return {
    isLocked: false,
    remainingAttempts: Math.max(0, config.maxAttempts - attemptsUsed),
    lockoutRemainingMs: 0,
  }
}

export function registerFailedLoginAttempt(role: AuthRole): AttemptStatus {
  const now = Date.now()
  const config = ROLE_CONFIG[role]
  const current = readJson<LoginAttemptPayload>(getAttemptKey(role))

  if (!current || now - current.firstAttemptAt > config.attemptWindowMs) {
    const next: LoginAttemptPayload = {
      count: 1,
      firstAttemptAt: now,
      lockoutUntil: null,
    }
    writeJson(getAttemptKey(role), next)
    return {
      isLocked: false,
      remainingAttempts: Math.max(0, config.maxAttempts - 1),
      lockoutRemainingMs: 0,
    }
  }

  const nextCount = current.count + 1
  if (nextCount >= config.maxAttempts) {
    const lockoutUntil = now + config.lockoutMs
    const locked: LoginAttemptPayload = {
      count: nextCount,
      firstAttemptAt: current.firstAttemptAt,
      lockoutUntil,
    }
    writeJson(getAttemptKey(role), locked)
    return {
      isLocked: true,
      remainingAttempts: 0,
      lockoutRemainingMs: config.lockoutMs,
    }
  }

  const updated: LoginAttemptPayload = {
    count: nextCount,
    firstAttemptAt: current.firstAttemptAt,
    lockoutUntil: null,
  }
  writeJson(getAttemptKey(role), updated)
  return {
    isLocked: false,
    remainingAttempts: Math.max(0, config.maxAttempts - nextCount),
    lockoutRemainingMs: 0,
  }
}

export type { AuthRole, AttemptStatus }