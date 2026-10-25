import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function DoctorApprovalTableLoading() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices 0.</TableCaption>
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
        {[1, 2, 3].map((item) => (
          <TableRow key={item}>
  <TableCell className="h-5 min-w-2xl ">
    <Skeleton className="h-4  rounded" />
  </TableCell>
</TableRow>

        ))}
      </TableBody>
    </Table>
  );
}
