import React from "react";
import CodeIcon from "@material-ui/icons/Code";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Footer.scss";

const Footer = () => {
	return (
		<footer className="app-footer">
			<a
				href="https://github.com/DaRoTP/Task-Manager_node-react"
				className="footer-item source-code">
				<CodeIcon />
				<span>source code</span>
			</a>
			<a
				href="https://github.com/DaRoTP"
				className="footer-item author">
				<AccountCircleIcon />
				<span>Author: @DaRo</span>
			</a>
		</footer>
	);
};

export default Footer;
