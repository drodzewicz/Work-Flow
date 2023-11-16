import React from "react";

import { env } from "@/config/env.config";

import useAuth from "@/hooks/useAuth";

import { useLogin } from "@/service/auth";

import "./DemoLogin.scss";

const DemoLogin = () => {
  const { login: authLogin } = useAuth();

  const { mutate: login } = useLogin({
    onSuccess(data) {
      const { user, accessToken } = data;
      authLogin({ user, token: accessToken });
    },
  });

  const loginDemoUser = () => {
    if (env.demoUser.username && env.demoUser.password) {
      login(env.demoUser as { username: string; password: string });
    }
  };

  return (
    <div className="demo-login">
      <h1 className="demo-login__title">Lets take a look around this app!!</h1>
      <p className="demo-login__text">
        You can <strong>login</strong> as a demo user and take a look around the app for yourself
      </p>
      <button
        disabled={!env.demoUser.username || !env.demoUser.password}
        className="btn btn--glow"
        onClick={loginDemoUser}
      >
        login
      </button>
    </div>
  );
};

export default DemoLogin;
