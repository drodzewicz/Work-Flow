import React from "react";
import "./Backdrop.scss";
import { BackdropProps } from ".";

const Backdrop: React.FC<BackdropProps> = ({ show, clicked, opacity = 0.6 }) => (
  <div
    onClick={clicked}
    role="presentation"
    style={{ opacity: show ? opacity : 0 }}
    className="backdrop"></div>
);

export default Backdrop;
