import React, { useMemo } from "react";

import { buildNotificationLink, getNotificationIcon } from "@/utils/notification";
import { IconType } from "react-icons";
import { FaTimes } from "react-icons/fa";

import { useDeleteNotification } from "@/service/self";

import "./Notification.scss";
import useRedirect from "@/hooks/useRedirect";

type NotificationProps = {
    notification: BoardNotification;
};

const NotificationIcon: React.FC<{ type: string }> = ({ type }) => {
    const Icon: IconType = getNotificationIcon(type);

    return <Icon className="notification__icon" />;
};

const Notification: React.FC<NotificationProps> = ({ notification }) => {
    const { goTo } = useRedirect();

    const { mutate: deleteNotification } = useDeleteNotification();

    const deleteNotificationHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        deleteNotification(notification._id);
    };

    const notificationLink = useMemo(
        () => buildNotificationLink(notification.key, notification.attributes ?? {}),
        [notification]
    );

    const navigateByMessage = () => {
        if (notificationLink) {
            goTo.custom(notificationLink);
        }
        deleteNotification(notification._id);
    };

    return (
        <div className="notification" onClick={navigateByMessage}>
            <div className="notification__content">
                <div className="notification__header">
                    <NotificationIcon type={notification.key} />
                    <h2 className="notification__title">{notification.title}</h2>
                </div>
                <hr className="break-line" />
                <p className="notification__message">{notification.description}</p>
            </div>
            <button
                aria-label="close"
                className="notification__close"
                onClick={deleteNotificationHandler}
            >
                <FaTimes />
            </button>
        </div>
    );
};

export default Notification;
