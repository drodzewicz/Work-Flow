import React from "react";
import CodeIcon from "@material-ui/icons/Code";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Footer.scss";

const Footer = () => {
	return (
		<footer className="app-footer">
			<p className="footer-item source-code">
				<CodeIcon />
				<span>source code</span>
			</p>
			<p className="footer-item author">
				<AccountCircleIcon />
				<span>Author: @DaRo</span>
			</p>
		</footer>
	);
};

export default Footer;
