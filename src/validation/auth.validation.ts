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



export const PatientRegistrationZodSchema = z.object({
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


});