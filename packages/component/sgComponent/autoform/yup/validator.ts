import * as yup from "yup";
import { YupObjectOrWrapped } from "./types";

export function validateSchema(schema: YupObjectOrWrapped, values: any) {
  try {
    const data = schema.validateSync(values, { abortEarly: false });
    return { success: true, data } as const;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        success: false,
        errors: error.inner.map((error) => ({
          path: error.path?.split(".") ?? [],
          message: error.message,
        })),
      } as const;
    }
    throw error;
  }
}
