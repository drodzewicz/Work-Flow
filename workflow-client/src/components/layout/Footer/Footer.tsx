import React from "react";

import { FaCode } from "react-icons/fa";

import { env } from "@/config/env.config";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="app-footer">
      <a href={env.links.sourceCode} id="footer__source-code" className="app-footer__item">
        <FaCode className="app-footer__icon" />
        <span>source code</span>
      </a>
      <span id="footer__author" className="app-footer__item">
        {`© ${new Date().getFullYear()}`}
        <a href={env.links.authorPage}>@drodzewicz</a>
        <span>| All Rights Resereved</span>
      </span>
    </footer>
  );
};

export default Footer;
