import React from "react";
import { TextField } from "@material-ui/core";
import "./TextInput.scss";
import { TextInputProps } from "./";

const TextInput: React.FC<TextInputProps> = ({
  hasErrors,
  helperText,
  label,
  name,
  type,
  multiline,
  onChange,
  value,
  className,
}) => {
  return (
    <TextField
      onChange={onChange}
      value={value}
      className={`workflow-textfield ${className || ""}`}
      error={hasErrors}
      helperText={helperText}
      label={label || name}
      name={name}
      type={type}
      variant={"standard"}
      multiline={!!multiline}
      rows={multiline?.rows}
      rowsMax={multiline?.max}
      margin="dense"
    />
  );
};

export default TextInput;
