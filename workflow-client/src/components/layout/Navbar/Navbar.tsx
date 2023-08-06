import React from "react";

import useAuth from "@/hooks/useAuth";
import useClient from "@/hooks/useClient";
import { useQuery } from "react-query";

import "./Navbar.scss";

import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";

const Navbar: React.FC = () => {
  const { user, token, login } = useAuth();
  const client = useClient();
  useQuery("user-self", () => client.get("/self"), {
    onSuccess: (response) => {
      const user = response.data;
      login({ user, token: token as string });
    },
  });

  return user ? <UserNav /> : <DefaultNav />;
};

export default Navbar;
