import { serviceParams } from "@/types/service/request";
import {
  registerParams,
  loginParams,
  updateCredentialsParams,
  changePasswrdParams,
  changeAvatarParams,
  searchUsersByUsernameParams,
} from "@/types/service/request";
import {
  isAuthenticatedResponse,
  GeneralResponse,
  loginResponse,
  searchUsersResponse,
} from "@/types/service/response";

import axios from "axios";

import callAPI from "./utils/fetchData";

const ROUTE_PREFIX = "/user";

// IS AUTHENTICATED
export const isUserAuthenticated = async ({  ...serviceProps }: serviceParams = {}) => {
  return await callAPI<isAuthenticatedResponse>({
    url: "/isAuth",
    token: true,
    method: "GET",
    ...serviceProps
  });
};

// REGISTER
export const register = async ({ payload, ...serviceProps }: registerParams) => {
  return await callAPI<GeneralResponse>({
    method: "POST",
    url: "/register",
    payload,
    ...serviceProps,
  });
};

// LOGIN
export const login = async ({ payload, ...serviceProps }: loginParams) => {
  return await callAPI<loginResponse>({
    method: "POST",
    url: "/login",
    payload,
    ...serviceProps,
  });
};

// PROFILE - POST
export const updateCredentials = async ({ payload, ...serviceProps }: updateCredentialsParams) => {
  return await callAPI<GeneralResponse>({
    method: "POST",
    url: `${ROUTE_PREFIX}/update_credentials`,
    token: true,
    payload,
    ...serviceProps,
  });
};

// PASSWORD - UPDATE
export const changePassword = async ({ payload, ...serviceProps }: changePasswrdParams) => {
  return await callAPI<GeneralResponse>({
    method: "PATCH",
    url: `${ROUTE_PREFIX}/change_password`,
    token: true,
    payload,
    ...serviceProps,
  });
};

// AVATAR - UPDATE
export const changeAvatar = async ({ payload, ...serviceProps }: changeAvatarParams) => {
  return await callAPI<GeneralResponse>({
    method: "PATCH",
    url: `${ROUTE_PREFIX}/change_avatar`,
    token: true,
    payload,
    ...serviceProps,
  });
};

// USER SEARCH - GET
export const searchUsersByUsername = async ({
  username,
  ...serviceProps
}: searchUsersByUsernameParams) => {
  return await callAPI<searchUsersResponse>({
    method: "GET",
    url: `${ROUTE_PREFIX}/find_user`,
    query: {
      username,
    },
    token: true,
    ...serviceProps,
  });
};
