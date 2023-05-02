import TextAreaField from "./TextAreaField";
import TextField from "./TextField";

  export { TextAreaField, TextField };

export interface TextFieldI {
  label?: string;
  error?: string;
}

export interface TextFieldInputProps extends TextFieldI, React.ComponentProps<"input"> {}

export interface TextAreaFieldProps extends TextFieldI, React.ComponentProps<"textarea"> {}
