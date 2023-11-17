import React from "react";

import useAuth from "@/hooks/useAuth";

import "./Navbar.scss";

import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return user ? <UserNav /> : <DefaultNav />;
};

export default Navbar;
