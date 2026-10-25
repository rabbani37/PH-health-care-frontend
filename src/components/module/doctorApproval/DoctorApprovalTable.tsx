import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DoctorReviewSheet from "./DoctorReviewSheet";
import { useSuspenseGelAllDoctors } from "@/hooks";

export default function DoctorApprovalTable({ ...paramsData }) {
  const { data } = useSuspenseGelAllDoctors(paramsData);

  const doctors = data?.data || [];
  console.log(doctors);
  console.log(paramsData);

  return (
    <Table>
      <TableCaption>A list of your recent invoices {doctors.length}.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>License no.</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Phone</TableHead>

          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow key={doctor.email} className="text-gray-700">
            <TableCell>{doctor?.name || "no name"}</TableCell>
            <TableCell>{doctor?.licenseNumber || "not email"}</TableCell>
            <TableCell>{doctor?.email || "no email"}</TableCell>

            <TableCell>{doctor?.specialization || "No-"}</TableCell>
            <TableCell>{doctor?.contactNumber || "01XXXXXXXX"}</TableCell>

            <TableCell className="text-right">
              <DoctorReviewSheet  doctorId= {doctor.id} paramsData={paramsData } />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
