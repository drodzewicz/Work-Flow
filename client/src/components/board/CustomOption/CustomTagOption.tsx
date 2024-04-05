import React from "react";

import "./CustomOption.scss";

type CustomTagOptionProps = {
    color: string;
    name: string;
};

const CustomTagOption: React.FC<CustomTagOptionProps> = ({ name, color }) => {
    return (
        <div className="custom-tag-option" style={{ "--_tag-color": color } as React.CSSProperties}>
            {name}
        </div>
    );
};

export default CustomTagOption;
