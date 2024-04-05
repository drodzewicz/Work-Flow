import { UserDTO } from "./user.dto.js";
import { RoleNames } from "../../config/permissions.config.js";

export interface MemberDTO {
    role: RoleNames;
    user: UserDTO;
}
