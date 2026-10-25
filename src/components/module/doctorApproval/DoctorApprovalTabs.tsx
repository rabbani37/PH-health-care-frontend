"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./DoctorApprovalTable";
import { Suspense, useState } from "react";
import DoctorApprovalTableLoading from "./DoctorApprovalTableLoading";
import { DoctorParams, DoctorVerificationStatus } from "@/types/doctor.type";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DoctorApprovalTabs() {
  const [tabs, setTabs] = useState("ALL");
  const verificationStatus: ["ALL" | DoctorVerificationStatus, string][] = [
    ["ALL", "All"],
    ["APPROVED", "Approved"],
    ["PENDING", "Pending"],
    ["REJECTED", "Rejected"],
  ];

  const paramsData: DoctorParams = {
    // ...(tabs === "ALL" ? {} : { verificationStatus: tabs }),
    verificationStatus: tabs === "ALL" ? "" : tabs,
    limit: 5,
    page: 1,
  };

  return (
    <>
      <Label>Seache Or Filter</Label>
      <div className="flex items-center justify-between mb-6 mt-3 gap-10">
        <Input placeholder="Search by name or email" className="w-1/4" />
        <Tabs value={tabs} onValueChange={(value) => setTabs(value)}>
          <TabsList>
            {verificationStatus.map(([value, lable]) => (
              <TabsTrigger key={value} value={value}>
                {lable}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<DoctorApprovalTableLoading />}>
        <DoctorApprovalTable {...paramsData} />
      </Suspense>
    </>
  );
}
