import React from "react";
import CodeIcon from "@material-ui/icons/Code";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="app-footer">
      <a
        href="https://github.com/DaRoTP/Task-Manager_node-react"
        id="footer__source-code"
        className="app-footer__item">
        <CodeIcon className="app-footer__icon" />
        <span>source code</span>
      </a>
      <a href="https://github.com/DaRoTP" id="footer__author" className="app-footer__item">
        <AccountCircleIcon className="app-footer__icon" />
        <span>Author: @DaRo</span>
      </a>
    </footer>
  );
};

export default Footer;
