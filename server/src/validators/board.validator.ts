import Joi from "joi";
import { validator } from "../utils/payloadValidation.utils.js";

const BoardPayloadSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
});

const boardPayloadValidator = validator(BoardPayloadSchema);

const UpdateBoardPayloadSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
});

const updateBoardPayloadValidator = validator(UpdateBoardPayloadSchema);

const CreateColumnPayloadSchema = Joi.object({
    name: Joi.string().required(),
});

const createColumnPayloadValidator = validator(CreateColumnPayloadSchema);

const UpdateColumnPayloadSchema = Joi.object({
    name: Joi.string(),
});

const updateColumnPayloadValidator = validator(UpdateColumnPayloadSchema);

const MoveColumnPayloadSchema = (columnCount: number) =>
    Joi.object({
        index: Joi.number()
            .min(0)
            .max(columnCount - 1),
    });

export {
    boardPayloadValidator,
    updateBoardPayloadValidator,
    createColumnPayloadValidator,
    updateColumnPayloadValidator,
    MoveColumnPayloadSchema,
};
