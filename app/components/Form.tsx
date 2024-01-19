import { useForm } from "react-hook-form"
import { FormData } from "@/types"
import FormField from "./FormField"

function Form() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<FormData>()

	const onSubmit = async (data: FormData) => {
		console.log("SUCCESS", data)
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
					placeholder="Password"
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
