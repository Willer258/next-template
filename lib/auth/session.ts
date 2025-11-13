// Simple session helpers for NextAuth v5
// These will need to be updated based on the final NextAuth v5 API

export async function getCurrentUser() {
  // Placeholder for getting current user
  // Implement with NextAuth v5 auth() or equivalent
  return null
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthenticated')
  }
  return user
}
