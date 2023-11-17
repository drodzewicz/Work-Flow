import Joi from "joi";
import { validator } from "../utils/payloadValidation.utils.js";

const LoginPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const loginPayloadValidator = validator(LoginPayloadSchema);

const RegisterPayloadSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
});

const registerPayloadValidator = validator(RegisterPayloadSchema);

export { loginPayloadValidator, registerPayloadValidator };
