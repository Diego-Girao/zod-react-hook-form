import { useForm } from "react-hook-form"
import { FormData, UserSchema, ValidFieldNames } from "@/types"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import FormField from "./FormField"
import { useState } from "react"

function Form() {
	const [success, setSuccess] = useState(false)
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
			setSuccess(true)
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

			const hideSuccessMessage = () => {
				setSuccess(false)
			}
			setTimeout(hideSuccessMessage, 3000)
		} catch (error) {
			alert("Submitting form failed!")
		}
	}

	return (
		<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex justify-between items-center p-4 bg-slate-300 text-purple-800 mb-4 rounded-md">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="lucide lucide-terminal-square size-7 md:size-10"
				>
					<path d="m7 11 2-2-2-2" />
					<path d="M11 13h4" />
					<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
				</svg>
				<h1 className="text-xl text-nowrap md:text-3xl font-bold">
					Work Xperience
				</h1>
			</div>
			<div className="grid col-auto md:grid-cols-2 gap-4 w-full">
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
				<div className="mt-2">
					{success && (
						<p className="font-semibold text-xs text-green-500 flex items-center gap-1 sm:text-sm">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-check"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M5 12l5 5l10 -10" />
							</svg>
							Form has been submitted successfully
						</p>
					)}
				</div>
			</div>
			<button
				type="submit"
				className="submit-button shadow-md shadow-black p-2 w-full md:w-1/2 rounded-md bg-purple-400 text-purple-950 text-xl"
			>
				Submit
			</button>
		</form>
	)
}
export default Form
