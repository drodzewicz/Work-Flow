import { Service } from "typedi";
import { PermissionsDTO, RolesDTO } from "../types/dto/index.js";
import { roles, permissions } from "../config/permissions.config.js";

@Service()
export class PermissionService {
    async getBoardPermissions(): Promise<PermissionsDTO> {
        return permissions;
    }

    async getBoardRoles(): Promise<RolesDTO> {
        return roles;
    }
}
