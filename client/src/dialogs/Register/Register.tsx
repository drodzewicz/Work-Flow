import React, { useState, useContext } from "react";
import "./Register.scss";
import RegisterStepOne from "./RegisterStepOne";
import RegisterStepTwo from "./RegisterStepTwo";
import LoadingOverlay from "components/layout/LoadingOverlay";

import { ModalContext, ModalActionType } from "context/ModalContext";
import { AlertContext, AlertActionType } from "context/AlertContext";
import { register } from "service";

import { RegisterFields, RegisterFieldsOr } from ".";

const Register = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { alertDispatch } = useContext(AlertContext);
  const { modalDispatch } = useContext(ModalContext);

  const [registerFormField, setRegisterFormFields] = useState<RegisterFields>({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    matchPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<RegisterFields>>({});

  const changeStepHandler = async (
    step: number,
    newData: RegisterFieldsOr,
    final: boolean = false
  ) => {
    setRegisterFormFields((data) => ({ ...data, ...newData }));
    if (final) {
      const { data, error } = await register({
        payload: { ...registerFormField, ...newData },
        setLoading,
      });
      if (!!data) {
        alertDispatch({
          type: AlertActionType.SUCCESS,
          payload: { message: data.message },
        });
        modalDispatch({ type: ModalActionType.CLOSE });
      } else if (!!error) {
        alertDispatch({ type: AlertActionType.ERROR, payload: { message: "validation error" } });
        setFieldErrors(error.message);
      }
      return;
    }
    setCurrentStep(step);
  };

  const steps = [
    <RegisterStepOne data={registerFormField} changeStep={changeStepHandler} />,
    <RegisterStepTwo
      data={registerFormField}
      changeStep={changeStepHandler}
      serverErrors={fieldErrors}
    />,
  ];

  return (
    <div className="register-form">
      <LoadingOverlay show={isLoading} opacity={0.5} />
      {steps[currentStep]}
    </div>
  );
};

export default Register;
