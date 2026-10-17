import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'top-notch-barber-admin-secret-key-change-in-production-2026'
)

export const COOKIE_NAME = 'admin_session'

export async function signAdminToken(payload = {}) {
  return await new SignJWT({ ...payload, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

export async function verifyAdminToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return await verifyAdminToken(token)
}

export function validateAdminCredentials(username, password) {
  const expectedUser = process.env.ADMIN_USERNAME || 'admin'
  const expectedPass = process.env.ADMIN_PASSWORD || 'topnotch2026'
  return username === expectedUser && password === expectedPass
}
