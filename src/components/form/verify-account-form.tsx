"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { ReactNode, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useDoctorVerifyAccount, useVerifyAccount } from "@/hooks";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

const RESETN_COOLDOWN = 5;
export default function VerifyAccountForm({
  mode,
}: {
  mode: "patient" | "doctor";
}) {
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const { mutate: verifyAccountPatient, isPending } = useVerifyAccount();
  const { mutate: verifyAccountDoctor, isPending:doctorVerifyPending } =useDoctorVerifyAccount()
    useDoctorVerifyAccount();

  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [resentTimer, setResentTimer] = useState(RESETN_COOLDOWN);

  const verifyAccount =
    mode === "doctor" ? verifyAccountDoctor : verifyAccountPatient;

  useEffect(() => {
    if (resentTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResentTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  });

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = { email, otp };

    verifyAccount(verifyData, {
      onSuccess: () => {
      
        if (mode === "doctor") {
          toast.add({
            type: "success",
            title: "Account verrification successfully",
            description:
              "Your account will approve by admin. Please wait few days",
          });

          router.push("/");
          return
        }

          toast.add({
          type: "success",
          title: "Welcome aboard! 🎉",
          description:
            "Your account is now fully active. You can proceed to log in.",
        });
        router.push("/");
        
      },
      onError: (error) => {
        toast.add({
          type: "error",
          title: "Account Verification failed",
          description: error.message || "Something is wrong",
        });
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please provide the OTP. We sent you in your email.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center ">
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) setIsInvalid(false);
              }}
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invaid OIP. Please try again" }]}
              />
            )}
          </Field>
          <CardDescription>Resend in {resentTimer}</CardDescription>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center space-x-15 ">
        <Button disabled={resentTimer > 0} variant={"outline"}>
          Resent{" "}
        </Button>
        <Button disabled={isPending ||doctorVerifyPending} type="submit" form="otp-form">
          {isPending ||doctorVerifyPending ? (
            <>
              <Spinner /> Submetting..
            </>
          ) : (
            "Submet"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
