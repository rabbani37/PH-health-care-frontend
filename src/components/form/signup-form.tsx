"use client";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { patientRegistrationZodSchema } from "@/validation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import GoogleLoginComponent from "./GoogleLoginComponent";
import z from "zod";
import { useRegisterPatient } from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

export function SignupForm({ className }: React.ComponentProps<"form">) {
  const router= useRouter()
  const [typePass, setTypePass] = useState(false);
  const [typePassConfirm, setTypePassConfirm] = useState(false);

  const { mutate: registration, isPending } = useRegisterPatient();

  type TPatientDefaultValues = z.infer<typeof patientRegistrationZodSchema>;
  const defaultValues: TPatientDefaultValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "01304567898",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: patientRegistrationZodSchema,
    },
    onSubmit: ({ value }) => {
      const registerData = {
        name: value.fullName,
        email: value.email,
        password: value.password,
        confirmPassword: value.confirmPassword,
        patient: {
          contactNumber: value.contactNumber,
        },
      };

      registration(registerData, {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Registration Successful!",
            description: `Welcome aboard ${value.fullName}! Your registration completed Please Verifyt your account using OTP`,
          });


          const params = new URLSearchParams({email:registerData.email})
          router.push(`/register/varify-account?${params}`)
        },

        onError:(error)=>{
          toast.add({
          type: "error",
          title: "Registration Failed",
          description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        });
        }
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn("flex flex-col gap-6", className)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Full Name */}
        <form.Field name="fullName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  id={field.name}
                  type="text"
                  placeholder="John Doe"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Email */}
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  id={field.name}
                  type="email"
                  placeholder="m@example.com"
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <div className="relative w-full">
                  <Input
                    onChange={(e) => field.handleChange(e.target.value)}
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    name={field.name}
                    type={typePass ? "text" : "password"}
                    placeholder="* * * * * * * "
                  />
                  <button
                    onClick={() => setTypePass(!typePass)}
                    className="absolute right-3 top-2"
                    type="button"
                  >
                    {typePass ? (
                      <EyeClosed className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Confirm Password */}
        <form.Field name="confirmPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <div className="relative w-full">
                  <Input
                    onChange={(e) => field.handleChange(e.target.value)}
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    name={field.name}
                    type={typePassConfirm ? "text" : "password"}
                    placeholder="* * * * * * * "
                  />
                  <button
                    onClick={() => setTypePassConfirm(!typePassConfirm)}
                    className="absolute right-3 top-2"
                    type="button"
                  >
                    {typePassConfirm ? (
                      <EyeClosed className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Contact Number */}
        <form.Field name="contactNumber">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Phone Number <small>(optional)</small>
                </FieldLabel>
                <Input
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  id={field.name}
                  type="text"
                  placeholder="01XXXXXXXXX"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Field>
          <Button disabled={isPending&& true} type="submit">{isPending ? (
              <>
                {" "}
                <Spinner /> Submetting..
              </>
            ) : (
              "Create Account"
            )}</Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <GoogleLoginComponent />
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
