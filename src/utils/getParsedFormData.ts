import { ZodType } from "zod";

export default function getParsedFormData<Schema extends ZodType>({
	formData,
	schema,
}: {
	formData: FormData;
	schema: Schema;
}): Schema extends ZodType<infer T> ? T : never {
	const formDataObject = Object.fromEntries(formData.entries());
	const parsedFormData = schema.safeParse(formDataObject);

	if (!parsedFormData.success) {
		throw new Error(parsedFormData.error.issues[0].message);
	}

	return parsedFormData.data;
}
