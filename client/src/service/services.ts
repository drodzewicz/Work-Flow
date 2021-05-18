import fetchData from "./fetchData";

interface serviceParams {
  setLoading?: (state: boolean) => void;
}

export const isUserAuthenticated = async ({ setLoading }: serviceParams = {}) => {
  return await fetchData({
    url: "/isAuth",
    token: true,
    method: "GET",
    setLoading,
  });
};

export const getPinnedBoards = async ({ setLoading }: serviceParams = {}) => {
  return await fetchData({
    method: "GET",
    url: "/board/user/pined_boards",
    token: true,
    setLoading,
  });
};

interface leaveBoardParams extends serviceParams {
  boardId: number;
}

export const leaveBoard = async ({ boardId, setLoading }: leaveBoardParams) => {
  return await fetchData({
    method: "DELETE",
    url: `/board/${boardId}/leave_board`,
    token: true,
    setLoading,
  });
};

interface deleteBoardParams extends serviceParams {
  boardId: number;
}

export const deleteBoard = async ({ boardId, setLoading }: deleteBoardParams) => {
  return await fetchData({
    method: "DELETE",
    url: `/board/${boardId}`,
    token: true,
    setLoading,
  });
};

interface getMyBoardsParams extends serviceParams {
  page?: number;
  limit?: number;
}

export const getMyBoards = async (
  { page, limit, setLoading }: getMyBoardsParams = { page: 1, limit: 8 }
) => {
  return await fetchData({
    method: "GET",
    url: `/board/user/my_boards?page=${page}&limit=${limit}`,
    token: true,
    setLoading,
  });
};

interface togglePinBoardParams extends serviceParams {
  boardId: number;
}

export const togglePinBoard = async ({ boardId, setLoading }: togglePinBoardParams) => {
  return await fetchData({
    method: "PATCH",
    url: `/board/user/pined_boards?boardId=${boardId}`,
    token: true,
    setLoading,
  });
};

export const getNotifications = async ({ setLoading }: serviceParams = {}) => {
  return await fetchData({
    url: "/notification",
    token: true,
    method: "GET",
    setLoading,
  });
};

interface removeNotificationParams extends serviceParams {
  notificationId: number;
}

export const removeNotification = async ({
  setLoading,
  notificationId,
}: removeNotificationParams) => {
  return await fetchData({
    url: `/notification/${notificationId}`,
    token: true,
    method: "DELETE",
    setLoading,
  });
};

interface updateBoardColumnParams extends serviceParams {
  boardId: number;
  columnId: number;
  payload?: {
    name?: string;
  };
}

export const updateBoardColumn = async ({
  boardId,
  columnId,
  setLoading,
  payload,
}: updateBoardColumnParams) => {
  return await fetchData({
    method: "PATCH",
    url: `/board/${boardId}/column/${columnId}`,
    token: true,
    payload,
    setLoading,
  });
};

interface getBoardInformationParams extends serviceParams {
  boardId: number;
}

export const getBoardInformation = async ({ setLoading, boardId }: getBoardInformationParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}?short=true`,
    token: true,
    setLoading,
  });
};

interface createBoardParams extends serviceParams {
  payload: {
    name: string;
    description: string;
  };
}

export const createBoard = async ({ setLoading, payload }: createBoardParams) => {
  return await fetchData({
    method: "POST",
    url: `/board/`,
    token: true,
    setLoading,
    payload,
  });
};

interface updateBoardParams extends serviceParams {
  boardId: number;
  payload: {
    name?: string;
    description?: string;
  };
}

export const updateBoard = async ({ boardId, setLoading, payload }: updateBoardParams) => {
  return await fetchData({
    method: "POST",
    url: `/board/${boardId}`,
    token: true,
    setLoading,
    payload,
  });
};

interface getBoardMembersParams extends serviceParams {
  boardId: number;
  limit?: number;
  page?: number;
}

export const getBoardMembers = async ({
  boardId,
  limit = 8,
  page = 1,
  setLoading,
}: getBoardMembersParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}/members?limit=${limit}&page=${page}`,
    token: true,
    setLoading,
  });
};

interface searchUsersByUsernameParams extends serviceParams {
  username: string;
}

export const searchUsersByUsername = async ({
  username,
  setLoading,
}: searchUsersByUsernameParams) => {
  return await fetchData({
    method: "GET",
    url: `/user/find_user?username=${username}`,
    token: true,
    setLoading,
  });
};

interface removeUserFromBoardParams extends serviceParams {
  boardId: number;
  userId: number;
}

export const removeUserFromBoard = async ({
  boardId,
  userId,
  setLoading,
}: removeUserFromBoardParams) => {
  return await fetchData({
    method: "DELETE",
    url: `/board/${boardId}/members/${userId}`,
    token: true,
    setLoading,
  });
};

interface addUserToBoardParams extends serviceParams {
  boardId: number;
  userId: number;
}

export const addUserToBoard = async ({ boardId, userId, setLoading }: addUserToBoardParams) => {
  return await fetchData({
    method: "PATCH",
    url: `/board/${boardId}/members?userId=${userId}`,
    token: true,
    setLoading,
  });
};

interface changeBoardUserRoleParams extends serviceParams {
  boardId: number;
  userId: number;
  newRole: string;
}

export const changeBoardUserRole = async ({
  boardId,
  userId,
  newRole,
  setLoading,
}: changeBoardUserRoleParams) => {
  return await fetchData({
    method: "PATCH",
    url: `/board/${boardId}/members/${userId}?newRole=${newRole}`,
    token: true,
    setLoading,
  });
};

interface changePasswrdParams extends serviceParams {
  payload: {
    newPassword: string;
    matchPassword: string;
  };
}

export const changePassword = async ({
  payload,
  setLoading,
}: changePasswrdParams) => {
  return await fetchData({
    method: "PATCH",
    url: "/user/change_password",
    token: true,
    payload,
    setLoading,
  });
};


interface changeAvatarParams extends serviceParams {
  payload: {
    imageURL: string
  };
}

export const changeAvatar = async ({ payload, setLoading }: changeAvatarParams) => {
  return await fetchData({
    method: "PATCH",
    url: "/user/change_avatar",
    token: true,
    payload,
    setLoading,
  });
};

interface loginParams extends serviceParams {
  payload: {
    username: string,
    password: string,
  };
}

export const login = async ({ payload, setLoading }: loginParams) => {
  return await fetchData({
    method: "POST",
    url: "/login",
    payload,
    setLoading,
  });
};

interface registerParams extends serviceParams {
  payload: {
    email: string,
    username: string,
    password: string,
    matchPassword: string
  };
}

export const register = async ({ payload, setLoading }: registerParams) => {
  return await fetchData({
    method: "POST",
    url: "/register",
    payload,
    setLoading,
  });
};

interface getBoardTagsParams extends serviceParams {
  boardId: number;
}

export const getBoardTags = async ({ boardId, setLoading }: getBoardTagsParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}/tag/`,
    token: true,
    setLoading,
  });
};

interface createBoardTagParams extends serviceParams {
  boardId: number;
  payload: {
    name: string;
    colorCode: string;
  };
}

export const createBoardTag = async ({ boardId,payload, setLoading }: createBoardTagParams) => {
  return await fetchData({
    method: "POST",
    url: `/board/${boardId}/tag`,
    token: true,
    payload,
    setLoading,
  });
};

interface updateBoardTagParams extends serviceParams {
  boardId: number;
  tagId: number;
  payload: {
    name: string;
    colorCode: string;
  };
}

export const updateBoardTag = async ({ boardId, payload, setLoading }: updateBoardTagParams) => {
  return await fetchData({
    method: "POST",
    url: `/board/${boardId}/tag`,
    token: true,
    payload,
    setLoading,
  });
};

interface deleteBoardTagParams extends serviceParams {
  boardId: number;
  tagId: number;
}

export const deleteBoardTag = async ({ boardId, tagId, setLoading }: deleteBoardTagParams) => {
  return await fetchData({
    method: "DELETE",
    url: `/board/${boardId}/tag/${tagId}`,
    token: true,
    setLoading,
  });
};

interface getBoardTaskParams extends serviceParams {
  boardId: number;
  taskId: number;
}

export const getBoardTask = async ({ boardId, taskId, setLoading }: getBoardTaskParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}/task/${taskId}`,
    token: true,
    setLoading,
  });
};
interface getBoardParams extends serviceParams {
  boardId: number;
}

export const getBoard = async ({ boardId, setLoading }: getBoardParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}`,
    token: true,
    setLoading,
  });
};


interface updateBoardTaskParams extends serviceParams {
  boardId: number;
  taskId: number;
  payload: any
}

export const updateBoardTask = async ({ boardId, taskId,payload, setLoading }: updateBoardTaskParams) => {
  return await fetchData({
    method: "POST",
    url: `/board/${boardId}/task/${taskId}`,
    token: true,
    setLoading,
    payload,
  });
};

interface searchUserInBoardParams extends serviceParams {
  boardId: number;
  username: string;
}

export const searchUserInBoard = async ({ boardId, username, setLoading }: searchUserInBoardParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}/members?username=${username}`,
    token: true,
    setLoading,
  });
};

interface getLoggedInUserBoardRoleParams extends serviceParams {
  boardId: number;
  userId: number;
}

export const getLoggedInUserBoardRole = async ({
  boardId,
  userId,
  setLoading,
}: getLoggedInUserBoardRoleParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}/members/${userId}`,
    token: true,
    setLoading,
  });
};

interface updateCredentialsParams extends serviceParams {
  payload: {
    name?: string,
    surname?: string,
    username?: string,
    email?: string
  }
}

export const updateCredentials = async ({setLoading, payload}: updateCredentialsParams) => {
  return await fetchData({
    method: "POST",
    url: "/user/update_credentials",
    token: true,
    setLoading,
    payload,
  });
};


