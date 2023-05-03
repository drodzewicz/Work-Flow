import React from "react";

import { BackdropProps } from "./types";

import "./Backdrop.scss";

const Backdrop: React.FC<BackdropProps> = ({ show, clicked, opacity = 0.6 }) => (
  <div
    onClick={clicked}
    role="presentation"
    style={{ opacity: show ? opacity : 0 }}
    className="backdrop"
  ></div>
);

export default Backdrop;
