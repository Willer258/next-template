// In-memory storage for authentication data
// In production, replace with database queries

import type { User, Session, PasswordResetToken, EmailVerificationToken } from '@/types/auth'

// Storage arrays
export const users: User[] = []
export const sessions: Session[] = []
export const passwordResetTokens: PasswordResetToken[] = []
export const emailVerificationTokens: EmailVerificationToken[] = []

// Helper functions
export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase())
}

export function findUserById(id: string): User | undefined {
  return users.find(u => u.id === id)
}

export function findSessionById(id: string): Session | undefined {
  return sessions.find(s => s.id === id)
}

export function findSessionByUserId(userId: string): Session[] {
  return sessions.filter(s => s.userId === userId)
}

export function deleteSession(sessionId: string): boolean {
  const index = sessions.findIndex(s => s.id === sessionId)
  if (index > -1) {
    sessions.splice(index, 1)
    return true
  }
  return false
}

export function deleteUserSessions(userId: string): number {
  const userSessions = sessions.filter(s => s.userId === userId)
  userSessions.forEach(session => {
    const index = sessions.indexOf(session)
    if (index > -1) {
      sessions.splice(index, 1)
    }
  })
  return userSessions.length
}

export function findPasswordResetToken(token: string): PasswordResetToken | undefined {
  return passwordResetTokens.find(t => t.token === token && !t.used)
}

export function invalidateUserPasswordResetTokens(userId: string): void {
  passwordResetTokens.forEach(t => {
    if (t.userId === userId && !t.used) {
      t.used = true
    }
  })
}

export function findEmailVerificationToken(token: string): EmailVerificationToken | undefined {
  return emailVerificationTokens.find(t => t.token === token && !t.used)
}

export function findEmailVerificationTokenByUserId(userId: string): EmailVerificationToken | undefined {
  return emailVerificationTokens.find(t => t.userId === userId && !t.used)
}
