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
import { FaGoogle } from "react-icons/fa6";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { PatientRegistrationZodSchema } from "@/validation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [typePass, setTypePass] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      contactNumber: "",
    },
    validators: {
      onSubmit: PatientRegistrationZodSchema,
    },

    onSubmit: ({ value }) => {
      console.log("value", value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

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
                  required
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Field>
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
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
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
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}{" "}
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

        <form.Field name="contactNumber">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Contact Number <small>(optional)</small>
                </FieldLabel>
                <Input
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  id={field.name}
                  type="number"
                  placeholder="01....."
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <FaGoogle />
            Sign up with Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
