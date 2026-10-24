import RoleGuard from '@/components/auth/roleGuard'
import DashboardShell from '@/components/dashboard/dashboardShell'
import React, { ReactNode } from 'react'

export default function AdminLayout({children}:{children:ReactNode}) {
  return (
    <RoleGuard roles={["ADMIN"]}>
      
      <DashboardShell userRole = "ADMIN">{ children}</DashboardShell>
      
     </RoleGuard>
  )
}
