import React from "react";

import "./TextField.scss";

export interface TextFieldI {
  label?: string;
  error?: string;
}

export interface TextAreaFieldProps extends TextFieldI, React.ComponentProps<"textarea"> {
  resize?: "both" | "horizontal" | "vertical" | "none";
}

const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {
  const { label, className, error, name, resize = "none", ...fieldProps } = props;

  return (
    <div className="text-field">
      <textarea
        {...fieldProps}
        name={name}
        className={`text-field__textarea scrollbar ${className || ""}`}
        style={{ ...fieldProps.style, resize }}
      ></textarea>
      <div className="text-field__line"></div>
      <label
        htmlFor={name}
        className={`text-field__label ${fieldProps.value !== "" ? "text-field__valid" : ""}`}
      >
        {label || name}
      </label>
      {!!error && <span className="text-field__error">{error}</span>}
    </div>
  );
};

export default TextAreaField;
