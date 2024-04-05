import React from "react";

import "./TagCard.scss";

type TagCardProps = {
    color: string;
    name: string;
    className?: string;
};

const TagCard: React.FC<React.PropsWithChildren<TagCardProps>> = ({
    color,
    name,
    children,
    className = "",
}) => {
    return (
        <div
            data-testid="task-tag"
            className={`tag-card ${className}`}
            style={{ "--_tag-color": color } as React.CSSProperties}
        >
            {name}
            {children}
        </div>
    );
};

export default TagCard;
