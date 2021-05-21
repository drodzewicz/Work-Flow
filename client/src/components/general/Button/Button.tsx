import React, { forwardRef } from "react";
import "./Button.scss";
import "./Button-dark.scss";
import { ButtonProps } from ".";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, ...props }, ref) => {
    
    const classNameComputed = () => {
      const classes = [];
      classes.push(variant || "standard");
      classes.push(className || "");
      return classes.join(" ");
    };

    return (
      <button {...props} ref={ref} className={classNameComputed()}>
        {children}
      </button>
    );
  }
);

export default Button;
