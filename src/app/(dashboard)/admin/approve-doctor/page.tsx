import DoctorApprovalTabs from '@/components/module/doctorApproval/DoctorApprovalTabs'
import React from 'react'

export default function ApproveDoctorPage() {
  return (
     <div className="space-y-6 p-6  ">
      {/* Header Panel */}
      <div className="border-b border-border pb-5">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Doctor Approval Management
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review credentials, update verification statuses, and manage newly submitted medical profiles.
        </p>
      </div>

      {/* Tabs Container Wrapper */}
      <div className="bg-card text-card-foreground rounded-lg border border-border shadow-sm p-6">
        <DoctorApprovalTabs />
      </div>
    </div>
  )
}
