import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // อ่านค่า token และ role จาก Cookie ที่เก็บไว้ตอน Login
  const token = request.cookies.get('token')?.value
  const role = request.cookies.get('role')?.value

  const { pathname } = request.nextUrl

  const isAdminRoute = pathname.startsWith('/admin')
  const isAuthRoute = pathname.startsWith('/auth')
  const isHomeRoute = pathname === '/'

  // 1. กรณีที่ยังไม่ได้ล็อกอิน (ไม่มี Token)
  if (!token) {
    // ถ้าพยายามเข้าหน้า admin  ให้เด้งไปหน้า หน้าหลัก
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    // ถ้าอยู่หน้าอื่น ให้ผ่านได้
    return NextResponse.next()
  }

  // 2. กรณีที่ล็อกอินแล้ว
  // หากพยายามเข้าหน้า /auth ให้ข้ามไปยังหน้าของตัวเอง
  if (isAuthRoute) {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    } else {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // ป้องกัน User เข้าหน้า Admin
  if (isAdminRoute && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // ป้องกัน Admin เข้าหน้า User (หน้าหลัก)
  if (isHomeRoute && role === 'admin') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // นอกเหนือจากเงื่อนไขทั้งหมด ปล่อยผ่านตามปกติ
  return NextResponse.next()
}

// ระบุ Path ที่ต้องการให้ Middleware ทำงาน
export const config = {
  matcher: ['/', '/admin/:path*', '/auth/:path*'],
}
