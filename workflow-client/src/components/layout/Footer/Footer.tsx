import React from "react";

import { FaCode, FaUserCircle } from "react-icons/fa";

import { githubLinks } from "@/config/externalLinks.config";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="app-footer">
      <a href={githubLinks.sourceCode} id="footer__source-code" className="app-footer__item">
        <FaCode className="app-footer__icon" />
        <span>source code</span>
      </a>
      <span id="footer__author" className="app-footer__item">
        {`© ${new Date().getFullYear()}`}
        <a href={githubLinks.authorPage}>@drodzewicz</a>
        <span>| All Rights Resereved</span>
      </span>
    </footer>
  );
};

export default Footer;
