import Joi from "joi";
import { validator } from "../utils/payloadValidation.utils.js";

const CreateTaskPayloadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  assignees: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
});

const createTaskPayloadValidator = validator(CreateTaskPayloadSchema);

const UpdateTaskPayloadSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  assignees: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
});

const updateTaskPayloadValidator = validator(UpdateTaskPayloadSchema);

const MoveTaskPayloadSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  rowIndex: Joi.number().required(),
});

const MoveTaskIndexPayloadSchema = (taskCount: number) => {
  const maxIndex = taskCount > 0 ? taskCount : 0;
  return Joi.object({
    rowIndex: Joi.number().min(0).max(maxIndex),
  });
};

const moveTaskPayloadValidator = validator(MoveTaskPayloadSchema);

export { createTaskPayloadValidator, updateTaskPayloadValidator, moveTaskPayloadValidator, MoveTaskIndexPayloadSchema };
