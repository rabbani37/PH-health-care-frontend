import RoleGuard from '@/components/auth/roleGuard'
import DashboardShell from '@/components/dashboard/dashboardShell'
import React, { ReactNode } from 'react'

export default function DoctorLayout({children}:{children:ReactNode}) {
  return (
    <RoleGuard roles={["DOCTOR"]}>
      
      <DashboardShell userRole = "DOCTOR">{ children}</DashboardShell>
      
     </RoleGuard>
  )
}
