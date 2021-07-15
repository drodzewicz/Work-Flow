import { serviceParams } from "./general";

export interface registerParams extends serviceParams {
  payload: {
    email: string;
    username: string;
    password: string;
    matchPassword: string;
  };
}

export interface loginParams extends serviceParams {
  payload: {
    username: string;
    password: string;
  };
}

export interface updateCredentialsParams extends serviceParams {
  payload: {
    name?: string;
    surname?: string;
    username?: string;
    email?: string;
  };
}

export interface changePasswrdParams extends serviceParams {
  payload: {
    newPassword: string;
    matchPassword: string;
  };
}

export interface changeAvatarParams extends serviceParams {
  payload: {
    imageURL: string;
  };
}

export interface searchUsersByUsernameParams extends serviceParams {
  username: string;
}
