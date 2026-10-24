import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import DoctorReviewSheet from "./DoctorReviewSheet";
import { useGelAllDoctors } from "@/hooks";

export default function DoctorApprovalTable() {
  const { data, isPending } = useGelAllDoctors();

  const doctors = data?.data || [];
  console.log(data);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>License no.</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Phone</TableHead>

          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow key={doctor.email} className="text-gray-600">
            <TableCell >
              {doctor?.name || "no name"}
            </TableCell>
            <TableCell >
              {doctor?.licenseNumber || "not email"}
            </TableCell>
            <TableCell >
              {doctor?.email || "no email"}
            </TableCell>

            <TableCell>{doctor?.specialization||"No-"}</TableCell>
            <TableCell>{doctor?.contactNumber||"01XXXXXXXX"}</TableCell>

            <TableCell className="text-right">
              <DoctorReviewSheet />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
