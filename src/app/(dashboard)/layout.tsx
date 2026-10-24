import AuthGuard from '@/components/auth/authGuard'
import React, { ReactNode } from 'react'

export default function GenaralDashboardLayout({children}:{children:ReactNode}) {




  return (
    <AuthGuard>{children}</AuthGuard>
  )
}
