"use client";

import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import {
  applyAsDoctorValidationZodSchema,
  isAcceptedFileType,
  isApproveFileSize,
  MAX_ADDITIONAL_FILES,
  MAX_FILE_SIZE,
} from "@/validation";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { FileText, FileUp, Plus } from "lucide-react";
import { formateFileSize } from "@/utils/file-size.utils";
import z from "zod";
import { ScrollArea } from "../ui/scroll-area";
import React from "react";
import { useApplyAsDoctor } from "@/hooks";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

export function DoctorApplyForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  type DoctorApplyDefaultValue = z.infer<
    typeof applyAsDoctorValidationZodSchema
  >;

  const { mutate: applyAsDoctor, isPending } = useApplyAsDoctor();
  const router = useRouter();



  const defaultValues: DoctorApplyDefaultValue = {
    name: "",
    email: "",
    address: "",
    specialization: "",
    licenseNumber: "",
    qualifications: "",
    experienceYears: Number(),
    bio: "",
    consultationFee: Number(),
    contactNumber: "",
    resume: null as File | null,
    additionalFiles: [] as File[],
  };
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: applyAsDoctorValidationZodSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);

      const doctorData = {
        user: {
          name: value.name,
          email: value.email,
        },
        doctor: {
          address: value.address?.trim(),
          specialization: value.specialization?.trim(),
          licenseNumber: value.licenseNumber?.trim(),
          qualifications: value.specialization?.trim(),
          experienceYears: Number(value.specialization) || 0,
          bio: value.bio?.trim(),
          consultationFee: Number(value.consultationFee),
          contactNumber: value.contactNumber?.trim(),
        },
      };
      applyAsDoctor(
        {
          data: doctorData,
          resume: value.resume as File,
          additionalFiles: value.additionalFiles,
        },
        {
          onSuccess: () => {
            toast.add({
              type: "success",
              title: "Application Submited",
              description: "Please Verify The Account",
            });

            const params = new URLSearchParams({email:doctorData.user.email})
            router.push(`/doctor-apply/verify-email?${params}`)
          },
          onError: (error) => {
            toast.add({
              type: "error",
              title: "Application Failed",
              description: error.message || "something is wrong",
            });
          },
        },
      );
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Apply as a doctor</CardTitle>
          <CardDescription>
            Enter your Info below to apply in your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* name field  */}
                <form.Field name="name">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Your Name</FieldLabel>

                        <Input
                          id={field.name}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          autoComplete="off"
                          name={field.name}
                          type="text"
                          placeholder="Name"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* email field  */}
                <form.Field name="email">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Your Email</FieldLabel>

                        <Input
                          id={field.name}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          autoComplete="off"
                          name={field.name}
                          type="text"
                          placeholder="example.mail.com"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* Contract number  */}
                <form.Field name="contactNumber">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Contract Number
                        </FieldLabel>
                        <Input
                          id={field.name}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          autoComplete="off"
                          name={field.name}
                          type="number"
                          placeholder="01XXXXXXX"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* address field  */}
                <form.Field name="address">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Practice Address
                        </FieldLabel>

                        <Input
                          id={field.name}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          autoComplete="off"
                          name={field.name}
                          type="text"
                          placeholder="dhaka, mirpur-2"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* Specialization Field */}
                <form.Field name="specialization">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Specialization
                        </FieldLabel>
                        <Input
                          id={field.name}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          autoComplete="off"
                          name={field.name}
                          type="text"
                          placeholder="e.g. Cardiology"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* License Number Field */}
                <form.Field name="licenseNumber">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          License Number
                        </FieldLabel>
                        <Input
                          id={field.name}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          autoComplete="off"
                          name={field.name}
                          type="text"
                          placeholder="License Number"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* Qualifications Field */}
                <form.Field name="qualifications">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Qualifications
                        </FieldLabel>
                        <Input
                          id={field.name}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          autoComplete="off"
                          name={field.name}
                          type="text"
                          placeholder="e.g. MBBS, MD"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* Experience Years Field */}
                <form.Field name="experienceYears">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Years of experience
                        </FieldLabel>
                        <Input
                          id={field.name}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          autoComplete="off"
                          name={field.name}
                          type="number"
                          placeholder="Years of experience"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* Consultation Fee Field */}
                <form.Field name="consultationFee">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Consultation Fee
                        </FieldLabel>
                        <Input
                          id={field.name}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          autoComplete="off"
                          name={field.name}
                          type="number"
                          placeholder="Fee amount"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                {/* File upload Field */}
                <form.Field name="resume">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;

                    const file = field.state.value;
                    return (
                      <Field>
                        <FieldLabel htmlFor="resume-field"> Resume</FieldLabel>

                        <div>
                          <Button
                            render={<Label htmlFor="resume-field" />}
                            nativeButton={false}
                            variant={"outline"}
                          >
                            <FileUp size={"4"} />
                            Upload Resume
                          </Button>

                          <Input
                            type="file"
                            id="resume-field"
                            name={field.name}
                            className="sr-only"
                            onChange={(e) => {
                              const selected = e.target.files?.[0] ?? null;

                              if (
                                selected &&
                                (!isApproveFileSize(selected.size) ||
                                  !isAcceptedFileType(selected?.type))
                              ) {
                                field.handleBlur();
                                return;
                              }

                              field.handleChange(selected);
                              e.target.value = "";
                            }}
                          />

                          <FieldDescription>
                            {file ? (
                              <span>
                                {file.name}{" "}
                                <small className="text-gray-400">
                                  {formateFileSize(file.size)}
                                </small>{" "}
                                <Button
                                  onClick={() => field.handleChange(null)}
                                  variant={"destructive"}
                                >
                                  X
                                </Button>{" "}
                              </span>
                            ) : (
                              <small>
                                Supported File: .pdf, .doc, .docx, .jpg, .png
                                and size {MAX_FILE_SIZE} MB
                              </small>
                            )}
                          </FieldDescription>
                        </div>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
                {/* Additional Files upload Field */}
                <form.Field name="additionalFiles">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;

                    const files = field.state.value || [];
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          {" "}
                          Additional Files
                        </FieldLabel>

                        <div className="flex items-center gap-3 ">
                          <Button
                            render={<Label htmlFor={field.name} />}
                            nativeButton={false}
                            variant={"outline"}
                          >
                            <Plus size={"4"} />
                            Add Files
                          </Button>

                          <Input
                            type="file"
                            id={field.name}
                            multiple
                            name={field.name}
                            className="sr-only"
                            onChange={(e) => {
                              const incoming = Array.from(e.target.files ?? []);
                              if (incoming.length === 0) return;
                              const invalid = incoming.some(
                                (file) =>
                                  !isAcceptedFileType(file.type) ||
                                  !isApproveFileSize(file.size),
                              );

                              if (invalid) {
                                field.handleBlur();
                                e.target.value = "";
                                return;
                              }
                              field.handleChange([...files, ...incoming]);
                            }}
                          />

                          {files.length > 0 && (
                            <span className="text-sm text-muted-foreground">
                              {files.length} of {MAX_ADDITIONAL_FILES} added
                            </span>
                          )}
                        </div>

                        <div className=" text-sm text-muted-foreground">
                          {files.length > 0 ? (
                            <ScrollArea className="flex flex-col gap-2 max-h-40">
                              {files.map((file, index) => (
                                <div
                                  key={`${file.name}-${index}`}
                                  className="flex items-center justify-between gap-2 p-1"
                                >
                                  <span className="flex min-w-0 items-center gap-2">
                                    <FileText className="size-4 shrink-0 text-primary" />
                                    <span className="truncate">
                                      {file.name}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      ({formateFileSize(file.size)})
                                    </span>
                                  </span>

                                  <Button
                                    variant={"destructive"}
                                    size="sm"
                                    onClick={() => {
                                      field.handleChange(
                                        files.filter((_, i) => i !== index),
                                      );
                                      field.handleBlur();
                                    }}
                                  >
                                    X
                                  </Button>
                                </div>
                              ))}
                            </ScrollArea>
                          ) : (
                            <small>
                              Supported File: .pdf, .doc, .docx, .jpg, .png and
                              size {MAX_FILE_SIZE} MB
                            </small>
                          )}
                        </div>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>

              {/* professional Bio  */}
              <form.Field name="bio">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Professional Bio <small>(optional)</small>
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        autoComplete="off"
                        name={field.name}
                        placeholder="About your bio here"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <Field>
                <Button disabled={isPending} type="submit">
                  {isPending ? (
                    <>
                      <Spinner /> Submitting...
                    </>
                  ) : (
                    <>Apply As Doctor</>
                  )}{" "}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
