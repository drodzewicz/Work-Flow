import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import "./Notification.scss";
import { useHistory } from "react-router-dom"

const Notification = ({ boardTitle, message, url, removeNotification }) => {

	const history = useHistory();

	const shortenText = (text, maxChars) => {
		return text.length > maxChars ? `${text.substring(0, maxChars - 3)}...` : text;
	};

	const clickNotificationLink = () => {
		removeNotification();
		if(!!url) history.push(url);
	}


	return (
		<div className="notification">
			<div onClick={clickNotificationLink} className="notification-body">
				<h2>{shortenText(boardTitle, 22)}</h2>
				<span>{shortenText(message, 55)}</span>
			</div>
			<CloseIcon onClick={removeNotification} />
		</div>
	);
};
Notification.defaultProps = {
	url: undefined
}

Notification.propTypes = {
	url: PropTypes.string,
	boardTitle: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	removeNotification: PropTypes.func.isRequired,
};

export default Notification;
