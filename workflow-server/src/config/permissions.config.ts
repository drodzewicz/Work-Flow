export enum Permissions {
  BOARD_DELETE = "BOARD_DELETE",
  BOARD_UPDATE = "BOARD_UPDATE",
  TASK_CREATE = "TASK_CREATE",
  TASK_DELETE = "TASK_DELETE",
  TASK_MOVE = "TASK_MOVE",
  MEMBER_ADD = "MEMBER_ADD",
  MEMBER_REMOVE = "MEMBER_REMOVE",
  ROLE_MODIFY = "ROLE_MODIFY",
  TAG_ADD = "TAG_ADD",
  TAG_REMOVE = "TAG_REMOVE",
  COLUMN_CREATE = "COLUMN_CREATE",
  COLUMN_REMOVE = "COLUMN_REMOVE",
  COLUMN_MOVE = "COLUMN_MOVE",
}

export enum RoleNames {
  ADMIN = "ADMIN",
  USER = "USER",
  VIEWER = "VIEWER",
  EDITOR = "EDITOR",
}

export const permissions = Object.values(Permissions);

export const roles: Record<RoleNames, { permissions: Permissions[] }> = {
  ADMIN: {
    permissions: [
      Permissions.BOARD_DELETE,
      Permissions.BOARD_UPDATE,
      Permissions.TASK_CREATE,
      Permissions.TASK_DELETE,
      Permissions.TASK_MOVE,
      Permissions.MEMBER_ADD,
      Permissions.MEMBER_REMOVE,
      Permissions.ROLE_MODIFY,
      Permissions.TAG_ADD,
      Permissions.TAG_REMOVE,
      Permissions.COLUMN_CREATE,
      Permissions.COLUMN_REMOVE,
      Permissions.COLUMN_MOVE,
    ],
  },
  EDITOR: {
    permissions: [
      Permissions.TASK_CREATE,
      Permissions.TASK_DELETE,
      Permissions.TASK_MOVE,
      Permissions.TAG_ADD,
      Permissions.TAG_REMOVE,
      Permissions.COLUMN_CREATE,
      Permissions.COLUMN_REMOVE,
      Permissions.COLUMN_MOVE,
    ],
  },
  USER: {
    permissions: [Permissions.TASK_MOVE, Permissions.COLUMN_MOVE],
  },
  VIEWER: {
    permissions: [],
  },
};
