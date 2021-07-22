import React from "react";
import "./TextField.scss";
import { TextAreaFieldProps } from ".";


const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {
  const { label, className, error, name, ...fieldProps } = props;
  return (
    <div className="text-field">
      <textarea
        name={name}
        className={`text-field__textarea scrollbar ${className || ""}`}
         {...fieldProps}></textarea>
      <div className="text-field__line"></div>
      <label
        htmlFor={name}
        className={`text-field__label ${fieldProps.value !== "" ? "text-field__valid" : ""}`}>
        {label || name}
      </label>
      {!!error && <span className="text-field__error">{error}</span>}
    </div>
  );
};

export default TextAreaField;
