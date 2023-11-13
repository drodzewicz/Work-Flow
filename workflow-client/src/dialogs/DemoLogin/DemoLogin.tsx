import React from "react";

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
    login({ username: "admin", password: "password123" });
  };

  return (
    <div className="demo-login">
      <h1 className="demo-login__title">Lets take a look around this app!!</h1>
      <p className="demo-login__text">
        You can <strong>login</strong> as a demo user and take a look around the app for yourself
      </p>
      <button className="btn btn--glow" onClick={loginDemoUser}>
        login
      </button>
    </div>
  );
};

export default DemoLogin;
