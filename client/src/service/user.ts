import fetchData, { serviceParams, callAPI2 } from "./utils/fetchData";
import { User } from "types";

// IS AUTHENTICATED
interface fullUserI extends User {
  name: string,
  surname: string,
  email: string
}
interface isAuthenticatedResponse {
  authorized: boolean;
  user: fullUserI;
}
export const isUserAuthenticated = async ({ setLoading }: serviceParams = {}) => {
  return await callAPI2<isAuthenticatedResponse>({
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
interface registerResponse {
  message: string;
}
export const register = async ({ payload, setLoading }: registerParams) => {
  return await callAPI2<registerResponse>({
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
interface loginResponse {
  token: string;
  user: User;
}
export const login = async ({ payload, setLoading }: loginParams) => {
  return await callAPI2<loginResponse>({
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
interface changePasswordResponse {
  message: string
}
export const changePassword = async ({ payload, setLoading }: changePasswrdParams) => {
  return await callAPI2<changePasswordResponse>({
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
interface changeAvatarResponse {
  message: string;
}
export const changeAvatar = async ({ payload, setLoading }: changeAvatarParams) => {
  return await callAPI2<changeAvatarResponse>({
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
type searchUsersResponse = User[];

export const searchUsersByUsername = async ({
  username,
  setLoading,
}: searchUsersByUsernameParams) => {
  return await callAPI2<searchUsersResponse>({
    method: "GET",
    url: `/user/find_user?username=${username}`,
    token: true,
    setLoading,
  });
};
