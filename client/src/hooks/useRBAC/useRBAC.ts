import { useGetCurrentUserBoardRole } from "@/service/permission";

enum Permissions {
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

type ActionType = "MANAGE_BOARD_MEMBERS" | keyof typeof Permissions;

type RBACProps = {
  boardId: string;
  action: ActionType;
};

const ResourcePermissionMapping: Record<ActionType, Permissions[]> = {
  BOARD_DELETE: [Permissions.BOARD_DELETE],
  BOARD_UPDATE: [Permissions.BOARD_UPDATE],
  TASK_CREATE: [Permissions.TASK_CREATE],
  TASK_DELETE: [Permissions.TASK_DELETE],
  TASK_MOVE: [Permissions.TASK_MOVE],
  MEMBER_ADD: [Permissions.MEMBER_ADD],
  MEMBER_DELETE: [Permissions.MEMBER_DELETE],
  MEMBER_ROLE_UPDATE: [Permissions.MEMBER_ROLE_UPDATE],
  TAG_CREATE: [Permissions.TAG_CREATE],
  TAG_DELETE: [Permissions.TAG_DELETE],
  COLUMN_CREATE: [Permissions.COLUMN_CREATE],
  COLUMN_DELETE: [Permissions.COLUMN_DELETE],
  COLUMN_MOVE: [Permissions.COLUMN_MOVE],
  MANAGE_BOARD_MEMBERS: [
    Permissions.MEMBER_ADD,
    Permissions.MEMBER_DELETE,
    Permissions.MEMBER_ROLE_UPDATE,
  ],
};

// role based access control
const useRBAC = ({ boardId, action }: RBACProps) => {
  const { data: userRole } = useGetCurrentUserBoardRole({
    boardId,
  });

  // check access based on action and permissions
  if (action) {
    const permissions = userRole?.permissions || [];

    return ResourcePermissionMapping[action].reduce(
      (acc, permission) => acc && permissions.includes(permission),
      true,
    );
  }

  // otherwise default to false (no access)
  return false;
};

export { ResourcePermissionMapping, Permissions };

export default useRBAC;
