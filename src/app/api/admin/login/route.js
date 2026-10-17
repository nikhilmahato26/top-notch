import { NextResponse } from 'next/server'
import { validateAdminCredentials, signAdminToken, COOKIE_NAME } from '@/lib/auth'

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    const isValid = validateAdminCredentials(username, password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      )
    }

    const token = await signAdminToken({ username })

    const response = NextResponse.json({
      success: true,
      user: { username, role: 'admin' },
    })

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (err) {
    return NextResponse.json(
      { error: err.message || 'Authentication failed' },
      { status: 500 }
    )
  }
}
