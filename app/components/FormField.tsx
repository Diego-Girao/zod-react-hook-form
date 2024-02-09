import { FormFieldProps } from "@/types"

const FormField: React.FC<FormFieldProps> = ({
	type,
	placeholder,
	name,
	register,
	error,
	valueAsNumber,
}) => (
	<>
		<input
			className="p-4 w-full rounded-md text-purple-700 ring-1"
			type={type}
			placeholder={placeholder}
			{...register(name, { valueAsNumber })}
		/>
		{error && (
			<span className="error-message text-red-500">{error.message}</span>
		)}
	</>
)

export default FormField
