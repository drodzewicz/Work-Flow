import React from "react";

import defaultAvatar from "@/assets/images/default_avatar.png";

export interface ImageProps extends React.ComponentProps<"img"> {
    fallbackImage?: string;
}

const Image: React.FC<ImageProps> = ({ src = "", ...props }) => {
    const fallback = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = defaultAvatar;
    };

    return <img {...props} src={src} onError={fallback} alt="" />;
};

export default Image;
