import { InferType } from "yup";

import { validationSchema } from "./formSchema";

export type RegisterType = InferType<typeof validationSchema>;
