import React from "react";
import Portal from "components/layout/Portal";
import "./WarningNotification.scss";
import { WarningNotificationProps, Warning } from "./";

import ErrorIcon from "@material-ui/icons/NotInterested";
import WaringIcon from "@material-ui/icons/ReportProblem";
import SuccessIcon from "@material-ui/icons/CheckCircle";

const WarningNotification: React.FC<WarningNotificationProps> = ({ message, type, show }) => {
  const warningIcon = () => {
    switch (type) {
      case Warning.SUCCESS:
        return <SuccessIcon className="warning-notification__content__icon" />;
      case Warning.ERROR:
        return <ErrorIcon className="warning-notification__content__icon" />;
      case Warning.WARNING:
        return <WaringIcon className="warning-notification__content__icon" />;
      default:
        return <ErrorIcon className="warning-notification__content__icon" />;
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

export default WarningNotification;
