import { FieldError, UseFormRegister } from "react-hook-form"
import { z, ZodType } from "zod"

export const UserSchema: ZodType<FormData> = z
	.object({
		email: z.string().email(),
		githubUrl: z
			.string()
			.url({ message: "Invalid Github url" })
			.includes("github.com"),
		linkedinUrl: z
			.string()
			.url({ message: "Invalid Linkedin url" })
			.includes("linkedin.com"),
		yearsOfExperience: z
			.number({
				required_error: "required field",
				invalid_type_error: "Years of Experience is required",
			})
			.min(1)
			.max(10),
		password: z
			.string()
			.min(6, { message: "Password is too short" })
			.max(20, { message: "Password is too long" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	})

export type FormData = {
	email: string
	githubUrl: string
	linkedinUrl: string
	yearsOfExperience: number
	password: string
	confirmPassword: string
}

export type FormFieldProps = {
	type: string
	placeholder: string
	name: ValidFieldNames
	register: UseFormRegister<FormData>
	error: FieldError | undefined
	valueAsNumber?: boolean
}

export type ValidFieldNames =
	| "email"
	| "githubUrl"
	| "linkedinUrl"
	| "yearsOfExperience"
	| "password"
	| "confirmPassword"
