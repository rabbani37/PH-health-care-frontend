import path from "path";
import z from "zod";

export const LoginZodSchema = z.object({
	email: z.email(),
	password: z
		.string("Name Must be string")
		.min(8, "Password Must Minimum 8 Characters Long.")
		.regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
		.regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

		.regex(/[0-9]/, "Password must contain atleast 1 Number")
		.regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
});


const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
export const patientRegistrationZodSchema = z.object({
	fullName: z
		.string()
		.min(3, "Name must atleast 3 characters long!!!")
		.max(50, "Name Must be maxium 50 characters"),
	email: z.email(),
	password: z
		.string()
		.min(8, "Password Must Minimum 8 Characters Long.")
		.regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
		.regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

		.regex(/[0-9]/, "Password must contain atleast 1 Number")
		.regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),

	contactNumber: z.string()
	.length(11, "Phone number must be exactly 11 characters")
		.optional()

		.or(z.literal("")) // Allows the field to remain empty safely
		.refine((val) => !val || bdPhoneRegex.test(val), {
			message: "Invalid Bangladeshi phone number format",
		}),
	confirmPassword: z.string().min(1, "Please confirm your password")

}).refine((data) => data.password === data.confirmPassword, { message: "Password don't match", path: ["confirmPassword"] });
