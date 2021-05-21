import { ChangeEvent } from "react";

export { default } from "./TextInput";

export interface TextInputProps {
  hasErrors?: boolean;
  helperText?: string;
  label?: string;
  name: string;
  type: "text" | "textarea";
  multiline?: {
    rows: number;
    max: number;
  };
  onChange?: (val: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
}