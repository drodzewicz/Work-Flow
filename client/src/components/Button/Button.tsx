import React, { forwardRef } from "react";
import "./Button.scss";
import { ButtonProps } from "./";

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children } = props;
  return (
    <button {...props} ref={ref} className={`btn-primary ${className || ""}`}>
      {children}
    </button>
  );
});

export default Button;
