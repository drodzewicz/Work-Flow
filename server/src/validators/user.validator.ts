import Joi from "joi";
import { validator } from "../utils/payloadValidation.utils.js";

const UpdateUserPayloadSchema = Joi.object({
  name: Joi.string(),
  surname: Joi.string(),
  email: Joi.string().email(),
});

const updateUserPayloadValidator = validator(UpdateUserPayloadSchema);

const UpdateUserAvatarPayloadSchema = Joi.object({
  image: Joi.string(),
});

const updateUserAvatarPayloadValidator = validator(UpdateUserAvatarPayloadSchema);

export { updateUserPayloadValidator, updateUserAvatarPayloadValidator };
