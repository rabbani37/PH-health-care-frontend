"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./DoctorApprovalTable";

export default function DoctorApprovalTabs() {
  return (
    <Tabs defaultValue="all" className="">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="approve">Approve</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>



      <TabsContent value="all">
        <DoctorApprovalTable />
      </TabsContent>

      <TabsContent value="pending">
        <DoctorApprovalTable />
      </TabsContent>

      <TabsContent value="approve">
        <DoctorApprovalTable />
      </TabsContent>

      <TabsContent value="rejected">
        <DoctorApprovalTable />
      </TabsContent>
    </Tabs>
  );
}
