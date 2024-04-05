import React from "react";

import "./Backdrop.scss";

export interface BackdropProps {
    show: boolean;
    onClick?: () => void;
    opacity?: number;
}

const Backdrop: React.FC<BackdropProps> = ({ show, onClick, opacity = 0.6 }) => (
    <div
        onClick={onClick}
        role="presentation"
        aria-label="backdrop"
        style={{ opacity: show ? opacity : 0 }}
        className="backdrop"
    ></div>
);

export default Backdrop;
