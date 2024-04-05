import React, { PropsWithChildren } from "react";

import Image from "@/components/general/Image/Image";

import "./User.scss";

export type UserProps = {
    imageSrc?: string;
    username: string;
    className?: string;
    onClick?: () => void;
};

const User: React.FC<PropsWithChildren<UserProps>> = ({
    imageSrc,
    username,
    className,
    onClick,
    children,
}) => {
    return (
        <div data-testid="user-card" onClick={onClick} className={`user-card ${className || ""}`}>
            <Image className="user-card__avatar" src={imageSrc} />
            <span title={username} className="user-card__username">
                {username}
            </span>
            <div className="user-card__buttons">{children}</div>
        </div>
    );
};

export default User;
