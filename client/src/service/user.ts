import callAPI, { serviceParams } from "./utils/fetchData";
import {
  isAuthenticatedResponse,
  GeneralResponse,
  loginResponse,
  searchUsersResponse,
} from "types/service/response";
import {
  registerParams,
  loginParams,
  updateCredentialsParams,
  changePasswrdParams,
  changeAvatarParams,
  searchUsersByUsernameParams,
} from "types/service/request";

const ROUTE_PREFIX = "/user";

// IS AUTHENTICATED
export const isUserAuthenticated = async ({ setLoading }: serviceParams = {}) => {
  return await callAPI<isAuthenticatedResponse>({
    url: "/isAuth",
    token: true,
    method: "GET",
    setLoading,
  });
};

// REGISTER
export const register = async ({ payload, setLoading }: registerParams) => {
  return await callAPI<GeneralResponse>({
    method: "POST",
    url: "/register",
    payload,
    setLoading,
  });
};

// LOGIN
export const login = async ({ payload, setLoading }: loginParams) => {
  return await callAPI<loginResponse>({
    method: "POST",
    url: "/login",
    payload,
    setLoading,
  });
};

// PROFILE - POST
export const updateCredentials = async ({ setLoading, payload }: updateCredentialsParams) => {
  return await callAPI<GeneralResponse>({
    method: "POST",
    url: `${ROUTE_PREFIX}/update_credentials`,
    token: true,
    setLoading,
    payload,
  });
};

// PASSWORD - UPDATE
export const changePassword = async ({ payload, setLoading }: changePasswrdParams) => {
  return await callAPI<GeneralResponse>({
    method: "PATCH",
    url: `${ROUTE_PREFIX}/change_password`,
    token: true,
    payload,
    setLoading,
  });
};

// AVATAR - UPDATE
export const changeAvatar = async ({ payload, setLoading }: changeAvatarParams) => {
  return await callAPI<GeneralResponse>({
    method: "PATCH",
    url: `${ROUTE_PREFIX}/change_avatar`,
    token: true,
    payload,
    setLoading,
  });
};

// USER SEARCH - GET
export const searchUsersByUsername = async ({
  username,
  setLoading,
}: searchUsersByUsernameParams) => {
  return await callAPI<searchUsersResponse>({
    method: "GET",
    url: `${ROUTE_PREFIX}/find_user?username=${username}`,
    token: true,
    setLoading,
  });
};
