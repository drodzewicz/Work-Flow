export interface RegisterOneFormValues {
  name: string;
  surname: string;
}

export interface RegisterTwoFormValues {
  email: string;
  username: string;
  password: string;
  matchPassword: string;
}

export interface RegisterFields extends RegisterOneFormValues, RegisterTwoFormValues {}

export type RegisterFieldsOr = RegisterOneFormValues | RegisterTwoFormValues;

export interface RegisterStepProps {
  data: RegisterFields;
  changeStep: (step: number, newData: RegisterFieldsOr, final?: boolean) => void;
  serverErrors?: object;
}
