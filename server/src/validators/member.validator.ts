import Joi from "joi";
import { validator } from "../utils/payloadValidation.utils.js";
import { RoleNames } from "../config/permissions.config.js";

const MemberRolePayloadSchema = Joi.object({
    role: Joi.string()
        .valid(...Object.values(RoleNames))
        .required(),
});

const memberRolePayloadValidator = validator(MemberRolePayloadSchema);

export { memberRolePayloadValidator };
