import Joi from "joi";
import { validator } from "../utils/payloadValidation.utils.js";

const CreateTagPayloadSchema = Joi.object({
  name: Joi.string().required(),
  key: Joi.string().required(),
  boardId: Joi.string().required(),
});

const createTagPayloadValidator = validator(CreateTagPayloadSchema);

const UpdateTagPayloadSchema = Joi.object({
  name: Joi.string(),
  key: Joi.string(),
});

const updateTagPayloadValidator = validator(UpdateTagPayloadSchema);

export { createTagPayloadValidator, updateTagPayloadValidator };
