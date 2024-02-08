import { useForm } from "react-hook-form"
import { FormData, UserSchema, ValidFieldNames } from "@/types"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import FormField from "./FormField"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { RocketIcon } from "@radix-ui/react-icons"

function Form() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(UserSchema),
	})

	const onSubmit = async (data: FormData) => {
		try {
			const response = await axios.post("/api/form", data) // Make a POST request
			const { errors = {} } = response.data // Destructure the 'errors' property from the response data
			console.log(data)

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
			reset()
			toast.success("Form has been submitted successfully.")
		} catch (error) {
			toast.error("Submitting form failed!")
		}
	}

	return (
		<form className="w-full max-w-screen-md" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex justify-between items-center p-4 bg-slate-300 text-purple-800 mb-4 rounded-md">
				<RocketIcon className="size-7 md:size-12" />
				<h1 className="text-xl text-nowrap md:text-3xl font-bold">
					Work Xperience
				</h1>
			</div>
			<div className="grid col-auto space-y-4 w-full">
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
					placeholder="Password (min 6 characters)"
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
			</div>
			<Button
				type="submit"
				className="text-xl mt-4 hover:shadow-md hover:shadow-purple-800"
			>
				Submit
			</Button>
		</form>
	)
}
export default Form
