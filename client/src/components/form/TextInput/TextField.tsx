import React, { forwardRef } from "react";

import "./TextField.scss";

export interface TextFieldI {
  label?: string;
  error?: string;
}

export interface TextFieldInputProps extends TextFieldI, React.ComponentProps<"input"> {}

const TextField = forwardRef<HTMLInputElement, TextFieldInputProps>((props, ref) => {
  const { label, className, error, name, id, ...fieldProps } = props;
  const inputId = id || name;
  return (
    <div className={`text-field ${className || ""}`}>
      <input id={inputId} ref={ref} name={name} className="text-field__input" {...fieldProps} />
      <div className="text-field__line"></div>
      <label
        htmlFor={inputId}
        className={`text-field__label ${fieldProps.value !== "" ? "text-field__valid" : ""}`}
      >
        {label || name}
      </label>
      {!!error && <span className="text-field__error">{error}</span>}
    </div>
  );
});

export default TextField;
