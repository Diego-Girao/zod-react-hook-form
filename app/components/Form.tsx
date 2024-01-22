import { useForm } from "react-hook-form"
import { FormData, UserSchema, ValidFieldNames } from "@/types"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import FormField from "./FormField"

function Form() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<FormData>({
		resolver: zodResolver(UserSchema),
	})

	const onSubmit = async (data: FormData) => {
		try {
			const response = await axios.post("/api/form", data) // Make a POST request
			const { errors = {} } = response.data // Destructure the 'errors' property from the response data

			// Define a mapping between server-side field names and their corresponding client-side names
			const fieldErrorMapping: Record<string, ValidFieldNames> = {
				email: "email",
				githubUrl: "githubUrl",
				yearsOfExperience: "yearsOfExperience",
				password: "password",
				confirmPassword: "confirmPassword",
			}

			// Find the first field with an error in the response data
			const fieldWithError = Object.keys(fieldErrorMapping).find(
				(field) => errors[field]
			)
			// If a field with an error is found, update the form error state using setError
			if (fieldWithError) {
				// Use the ValidFieldNames type to ensure the correct field names
				setError(fieldErrorMapping[fieldWithError], {
					type: "server",
					message: errors[fieldWithError],
				})
			}
		} catch (error) {
			alert("Submitting form failed!")
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid col-auto">
				<h1 className="text-3xl font-bold mb-4">Zod 'N React-Hook-Form</h1>
				<FormField
					type="email"
					placeholder="johndoe@mail.com"
					name="email"
					register={register}
					error={errors.email}
				/>
				<FormField
					type="text"
					placeholder="https://github.com/john-doe"
					name="githubUrl"
					register={register}
					error={errors.githubUrl}
				/>
				<FormField
					type="text"
					placeholder="https://www.linkedin.com/in/john-doe"
					name="linkedinUrl"
					register={register}
					error={errors.linkedinUrl}
				/>
				<FormField
					type="number"
					placeholder="Years of Experience (1 - 10)"
					name="yearsOfExperience"
					register={register}
					error={errors.yearsOfExperience}
					valueAsNumber
				/>
				<FormField
					type="password"
					placeholder="Password (min 8 characters)"
					name="password"
					register={register}
					error={errors.password}
				/>
				<FormField
					type="password"
					placeholder="Confirm Password"
					name="confirmPassword"
					register={register}
					error={errors.confirmPassword}
				/>
				<button type="submit" className="submit-button">
					Submit
				</button>
			</div>
		</form>
	)
}
export default Form
