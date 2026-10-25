"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useGelAllDoctors } from "@/hooks";
import { DoctorParams } from "@/types/doctor.type";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle,
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  UserRound,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface Props {
  doctorId: string;
  paramsData: DoctorParams;
}

export default function DoctorReviewSheet({ doctorId, paramsData }: Props) {
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [open, setOpen] = useState(false);

  const { data } = useGelAllDoctors(paramsData);

  const doctor = data?.data?.find((item) => item.id === doctorId);

  const status = doctor?.verificationStatus;

  const statusStyles: Record<string, string> = {
    APPROVED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
    REJECTED: "bg-red-50 text-red-700 ring-red-600/20",
  };

  const formatDate = (date?: string | null) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(parsedDate);
  };

  const InfoItem = ({
    label,
    value,
    icon: Icon,
  }: {
    label: string;
    value?: string | number | null;
    icon: React.ElementType;
  }) => (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border bg-background p-3">
      <div className="rounded-lg bg-muted p-2">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 break-words text-sm font-medium">
          {value !== null && value !== undefined && value !== ""
            ? value
            : "Not provided"}
        </p>
      </div>
    </div>
  );

  const handleReviewActions = () => {
    setOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={()=>setOpen(!open)}>
      <SheetTrigger
        render={
          <Button onClick={() => setOpen(true)} variant="outline" size="sm" />
        }
      >
        Review
      </SheetTrigger>

      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        {!doctor ? (
          <div className="flex min-h-60 items-center justify-center p-6">
            <p className="text-sm text-muted-foreground">
              Doctor information not found.
            </p>
          </div>
        ) : (
          <>
            <SheetHeader className="border-b pb-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="size-4" />
                Doctor verification
              </div>

              <SheetTitle className="text-xl">Review doctor profile</SheetTitle>

              <SheetDescription>
                Review professional credentials and account details before
                making a verification decision.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 px-4 py-5">
              {/* Doctor profile */}
              <section className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    <UserRound className="size-7 text-primary" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-lg font-semibold">
                      {doctor.name}
                    </h3>

                    <p className="mt-1 flex items-start gap-2 break-all text-sm text-muted-foreground">
                      <Mail className="mt-0.5 size-4 shrink-0" />
                      {doctor.email}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                          statusStyles[status ?? ""] ??
                          "bg-muted text-muted-foreground ring-border"
                        }`}
                      >
                        {status ?? "UNKNOWN"}
                      </span>

                      {doctor.user?.emailVerified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                          <BadgeCheck className="size-3.5" />
                          Email verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Professional information */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="size-4 text-primary" />
                  <h3 className="font-semibold">Professional information</h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <InfoItem
                    label="Specialization"
                    value={doctor.specialization}
                    icon={Stethoscope}
                  />

                  <InfoItem
                    label="Qualification"
                    value={doctor.qualifications}
                    icon={FileText}
                  />

                  <InfoItem
                    label="BMDC license number"
                    value={doctor.licenseNumber}
                    icon={ShieldCheck}
                  />

                  <InfoItem
                    label="Experience"
                    value={
                      doctor.experienceYears != null
                        ? `${doctor.experienceYears} years`
                        : null
                    }
                    icon={Clock3}
                  />
                </div>
              </section>

              {/* Contact details */}
              <section className="space-y-3">
                <h3 className="font-semibold">Contact information</h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <InfoItem
                    label="Contact number"
                    value={doctor.contactNumber}
                    icon={Phone}
                  />

                  <InfoItem
                    label="Address"
                    value={doctor.address}
                    icon={MapPin}
                  />

                  <InfoItem
                    label="Consultation fee"
                    value={
                      doctor.consultationFee != null
                        ? `৳${doctor.consultationFee}`
                        : null
                    }
                    icon={FileText}
                  />

                  <InfoItem
                    label="Registration date"
                    value={formatDate(doctor.createdAt)}
                    icon={CalendarDays}
                  />
                </div>
              </section>

              {/* Biography */}
              {doctor.bio && (
                <section className="space-y-2">
                  <h3 className="font-semibold">About the doctor</h3>
                  <p className="rounded-xl border p-4 text-sm leading-6 text-muted-foreground">
                    {doctor.bio}
                  </p>
                </section>
              )}

              {/* Resume */}
              {doctor.resume && (
                <section className="space-y-2">
                  <h3 className="font-semibold">Resume / CV</h3>
                  <a
                    href={doctor.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border p-3 text-sm hover:bg-muted"
                  >
                    <FileText className="size-5 text-primary" />
                    <span className="flex-1 font-medium">
                      View doctor&apos;s resume
                    </span>
                    <span className="text-muted-foreground">↗</span>
                  </a>
                </section>
              )}

              {/* Rejection reason */}
              {doctor.rejectionReason && (
                <section className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <h3 className="flex items-center gap-2 font-semibold text-red-700">
                    <XCircle className="size-4" />
                    Rejection reason
                  </h3>
                  <p className="mt-2 text-sm text-red-700">
                    {doctor.rejectionReason}
                  </p>
                </section>
              )}

              {confirmRejection && (
                <>
                  <section className="rounded-xl border-2 border-red-300 ">
                    <Textarea placeholder="Write Rejection Reason" />
                  </section>
                  <Button
                    onClick={() => handleReviewActions()}
                    className=" bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <CheckCircle className="size-4" />
                    Confirm Canceled
                  </Button>
                </>
              )}

              {/* Review actions */}
              {status === "PENDING" && (
                <section className="space-y-3 border-t pt-5">
                  <h3 className="font-semibold">Verification decision</h3>
                  <p className="text-sm text-muted-foreground">
                    Confirm the submitted information before approving or
                    rejecting this doctor.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
 onClick={() => handleReviewActions()}                      className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="size-4" />
                      Approve doctor
                    </Button>

                    <Button
                      onClick={() => setConfirmRejection(true)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="size-4" />
                      Reject doctor
                    </Button>
                  </div>
                </section>
              )}

              {status === "APPROVED" && (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                  <CheckCircle2 className="size-5 shrink-0" />
                  <p className="text-sm font-medium">
                    This doctor has already been approved.
                  </p>
                </div>
              )}

              {status === "REJECTED" && (
                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
                  <XCircle className="size-5 shrink-0" />
                  <p className="text-sm font-medium">
                    This doctor&apos;s verification was rejected.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
