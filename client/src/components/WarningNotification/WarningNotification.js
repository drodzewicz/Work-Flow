import React from "react";
import PropTypes from "prop-types"
import Portal from "HOC/Portal";
import "./WarningNotification.scss";

import ErrorIcon from '@material-ui/icons/NotInterested';
import WaringIcon from '@material-ui/icons/ReportProblem';
import SuccessIcon from '@material-ui/icons/CheckCircle';

const WarningNotification = ({message, type, show}) => {

    const warningIcon = () => {
        switch (type) {
            case "SUCCESS":
                return <SuccessIcon />
            case "ERROR":
                return <ErrorIcon />
            case "WARNING":
                return <WaringIcon />
            default:
                return <ErrorIcon />
        }
    }
    if(show) {
        return (
            <Portal mountTo="root-warning-notifications">
                <div className={`warning-notification ${type.toLowerCase()}`}>
                    <div className="notification-body-wrapper">
                        { warningIcon() }
                        <span className="warning-body">{message}</span>
                    </div>
                </div>
            </Portal>
        )
    } else return null;
    
}

WarningNotification.defaultProps = {
    type: "SUCCESS",
    show: true
}

WarningNotification.propTypes = {
    show: PropTypes.bool,
    message: PropTypes.string.isRequired,
    type: PropTypes.string
}

export default WarningNotification
