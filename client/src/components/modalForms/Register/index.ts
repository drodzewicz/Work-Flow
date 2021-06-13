export { default } from "./Register";

export interface RegisterFields {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  matchPassword: string;
}

export interface RegisterStepProps {
  data: RegisterFields;
  changeStep: (step: number, newData: any, final?: boolean) => void;
  serverErrors?: Object;
}