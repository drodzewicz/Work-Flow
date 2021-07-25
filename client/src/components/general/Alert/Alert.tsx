import React from "react";
import Portal from "components/layout/Portal";
import "./Alert.scss";
import { AlertProps, AlertTypes } from ".";

import { FaCheck, FaExclamationTriangle, FaExclamationCircle } from "react-icons/fa";

const Alert: React.FC<AlertProps> = ({ message, type, show }) => {
  const warningIcon = () => {
    switch (type) {
      case AlertTypes.SUCCESS:
        return <FaCheck className="warning-notification__content__icon" />;
      case AlertTypes.ERROR:
        return <FaExclamationCircle className="warning-notification__content__icon" />;
      case AlertTypes.WARNING:
        return <FaExclamationTriangle className="warning-notification__content__icon" />;
      default:
        return <FaExclamationCircle className="warning-notification__content__icon" />;
    }
  };
  if (show) {
    return (
      <Portal mountTo="root-warning-notifications">
        <div className={`warning-notification warning-notification--${type.toLowerCase()}`}>
          <div className="warning-notification__content">
            {warningIcon()}
            <p className="warning-notification__content__message">{message}</p>
          </div>
        </div>
      </Portal>
    );
  } else return null;
};

export default Alert;
