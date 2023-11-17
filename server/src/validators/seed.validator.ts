import Joi from "joi";
import { validator } from "../utils/payloadValidation.utils.js";

const SeedPayloadSchema = Joi.object({
  userCount: Joi.number().min(1),
  boardCount: Joi.number().min(1),
  tagCount: Joi.number().min(1),
  taskCount: Joi.number().min(1),
});

const seedPayloadValidator = validator(SeedPayloadSchema);

export { seedPayloadValidator };
