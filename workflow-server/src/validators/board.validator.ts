import Joi from "joi";
import { validator } from "../utils/payloadValidation.utils.js";

const BoardPayloadSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

const boardPayloadValidator = validator(BoardPayloadSchema);

export { boardPayloadValidator };
