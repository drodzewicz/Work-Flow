import React from "react";

import { IconType } from "react-icons";

import "./ProfileSectionCard.scss";

type ProfileSectionCardProps = {
    title: string;
    Icon: IconType;
    className?: string;
};

const ProfileSectionCard: React.FC<React.PropsWithChildren<ProfileSectionCardProps>> = ({
    title,
    Icon,
    children,
    className = "",
}) => {
    return (
        <section className={`profile-section-card ${className}`}>
            <header className="profile-section-card__header">
                <h1 className="profile-section-card__title">
                    <Icon /> {title}
                </h1>
                <hr className="break-line" />
            </header>
            <main className="profile-section-card__main">{children}</main>
        </section>
    );
};

export default ProfileSectionCard;
