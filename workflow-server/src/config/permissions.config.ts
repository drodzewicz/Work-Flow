export enum Permissions {
  // BOARD
  BOARD_DELETE = "BOARD_DELETE",
  BOARD_UPDATE = "BOARD_UPDATE",
  // TASK
  TASK_CREATE = "TASK_CREATE",
  TASK_DELETE = "TASK_DELETE",
  TASK_MOVE = "TASK_MOVE",
  // MEMBER
  MEMBER_ADD = "MEMBER_ADD",
  MEMBER_DELETE = "MEMBER_DELETE",
  MEMBER_ROLE_UPDATE = "MEMBER_ROLE_UPDATE",
  // TAG
  TAG_CREATE = "TAG_CREATE",
  TAG_DELETE = "TAG_DELETE",
  //COLUMN
  COLUMN_CREATE = "COLUMN_CREATE",
  COLUMN_DELETE = "COLUMN_DELETE",
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
      Permissions.MEMBER_DELETE,
      Permissions.MEMBER_ROLE_UPDATE,
      Permissions.TAG_CREATE,
      Permissions.TAG_DELETE,
      Permissions.COLUMN_CREATE,
      Permissions.COLUMN_DELETE,
      Permissions.COLUMN_MOVE,
    ],
  },
  EDITOR: {
    permissions: [
      Permissions.TASK_CREATE,
      Permissions.TASK_DELETE,
      Permissions.TASK_MOVE,
      Permissions.TAG_CREATE,
      Permissions.TAG_DELETE,
      Permissions.COLUMN_CREATE,
      Permissions.COLUMN_DELETE,
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
