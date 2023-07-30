import { Permissions, RoleNames } from "../../config/permissions.config.js";

export type PermissionsDTO = Permissions[];

export type RolesDTO = Record<RoleNames, { permissions: Permissions[] }>;
