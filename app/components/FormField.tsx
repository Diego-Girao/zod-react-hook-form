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
			className="p-4 w-full rounded-md"
			type={type}
			placeholder={placeholder}
			{...register(name, { valueAsNumber })}
		/>
		{error && <span className="error-message">{error.message}</span>}
	</>
)

export default FormField
