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
import { Input } from "../ui/input";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { LoginZodSchema } from "@/validation";
import {  useLogin } from "@/hooks";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import GoogleLoginComponent from "./GoogleLoginComponent";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [typePass, setTypePass] = useState(false);
  const { mutate: login, isPending: loginPending } = useLogin();


  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "testerdoctor@gmail.com",
      password: "Tester@doctor12345",
    },
    validators: {
      onSubmit: LoginZodSchema,
    },

    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Welcome back!",
            description: "You have logged in successfully.",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            type: "error",
            title: "Login Failed",
            description:
              err.message || "Invalid email or password. Please try again.",
          });
        },
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
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  onChange={(e) => field.handleChange(e.target.value)}
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  name={field.name}
                  placeholder="m@example.com"
                  type="email"
                  required
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Link
                    href="/forgate-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative w-full">
                  <Input
                    onChange={(e) => field.handleChange(e.target.value)}
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    name={field.name}
                    type={typePass ? "text" : "password"}
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
              </Field>
            );
          }}
        </form.Field>

        <Field>
          <Button disabled={loginPending && true} type="submit">
            {loginPending ? (
              <>
                {" "}
                <Spinner /> Submetting..
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
         <GoogleLoginComponent />

          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
