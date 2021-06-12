import fetchData, { serviceParams } from "./utils/fetchData";

// IS AUTHENTICATED
export const isUserAuthenticated = async ({ setLoading }: serviceParams = {}) => {
  return await fetchData({
    url: "/isAuth",
    token: true,
    method: "GET",
    setLoading,
  });
};

// REGISTER
interface registerParams extends serviceParams {
  payload: {
    email: string;
    username: string;
    password: string;
    matchPassword: string;
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

// LOGIN
interface loginParams extends serviceParams {
  payload: {
    username: string;
    password: string;
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

// PROFILE - POST
interface updateCredentialsParams extends serviceParams {
  payload: {
    name?: string;
    surname?: string;
    username?: string;
    email?: string;
  };
}
export const updateCredentials = async ({ setLoading, payload }: updateCredentialsParams) => {
  return await fetchData({
    method: "POST",
    url: "/user/update_credentials",
    token: true,
    setLoading,
    payload,
  });
};

// PASSWORD - UPDATE
interface changePasswrdParams extends serviceParams {
  payload: {
    newPassword: string;
    matchPassword: string;
  };
}
export const changePassword = async ({ payload, setLoading }: changePasswrdParams) => {
  return await fetchData({
    method: "PATCH",
    url: "/user/change_password",
    token: true,
    payload,
    setLoading,
  });
};

// AVATAR - UPDATE
interface changeAvatarParams extends serviceParams {
  payload: {
    imageURL: string;
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

// USER SEARCH - GET
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

