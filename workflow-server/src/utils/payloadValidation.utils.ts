import { PayloadError } from "../errors/PayloadError.js";

export const validator = (Schema) => (payload) => Schema.validate(payload, { abortEarly: false });

export const fieldErrorsHandler = (validatorData: any) => {
  const { error } = validatorData;
  if (error) {
    const otherErrors = error?.details?.map((err) => ({
      key: err?.path?.join("."),
      message: err?.message?.replaceAll(`\"`, ""),
    }));
    const message = error.message?.replaceAll(`\"`, "");
    throw new PayloadError(message, otherErrors);
  }
};
