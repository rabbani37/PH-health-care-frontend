import z, { file } from "zod";



export const applyAsDoctorValidationZodSchema = z.object({

    name: z.string().trim().min(2, "Name must be at least 2 characters long"),

    email: z.email("Invalid email address").trim().toLowerCase(),



    address: z
        .string()
        .trim()
        .min(5, "Address must be at least 5 characters long")
        .optional(),

    specialization: z.string().trim().min(2, "Specialization is required"),

    licenseNumber: z.string().trim().min(3, "License number is required"),

    qualifications: z.string().trim().min(2, "Qualifications are required"),

    // Handles converting incoming FormData strings like "12" into an integer number
    experienceYears: z
        .number()
        .int("Experience years must be an integer")
        .min(0, "Experience years cannot be negative"),

    bio: z
        .string()
        .trim()
        .max(1000, "Bio cannot exceed 1000 characters")
        .optional(),

    // Handles converting incoming FormData strings like "150.00" into a float number
    consultationFee: z
        .number()
        .min(0, "Consultation fee cannot be negative")
        .optional(),
    contactNumber: z
        .string()
        .trim()
        .min(5, "Contact number is invalid")
        .optional(),
    resume: file().nullable(),
    additionalFiles: z.array(file())
});




export const MAX_FILE_SIZE= 5
export const MAX_FILE_SIZE_BYTES= MAX_FILE_SIZE*1024*1024;
export const ACCEPTED_FILE_TYPES=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/png", "image/jpeg"];
export const MAX_ADDITIONAL_FILES= 5



export  function isApproveFileSize(fileSize:number) {
    return fileSize <= MAX_FILE_SIZE_BYTES;
}

export function isAcceptedFileType (fileType:string){
    return ACCEPTED_FILE_TYPES.includes(fileType)
}