import React, { useContext } from "react";
import "./Login.scss";
import { UserContext, UserActionType } from "context/UserContext";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { login } from "service";
import SimpleForm from "components/SimpleForm/SimpleForm";
import { validationSchema, fields } from "./";

const Login = () => {
  const { userDispatch } = useContext(UserContext);
  const { modalDispatch } = useContext(ModalContext);

  const handleSubmit = async (
    submittedData: any,
    { setSubmitting, setErrors }: { setSubmitting: any; setErrors: any }
  ) => {
    const { data, error } = await login({ setLoading: setSubmitting, payload: submittedData });
    if (!!data) {
      const { token, user } = data;
      userDispatch({ type: UserActionType.LOGIN_SUCCESS, payload: { user, token } });
      modalDispatch({ type: ModalActionType.CLOSE });
    } else if (!!error) {
      setErrors({ username: "bad username", password: "bad password" });
    }
  };

  return (
    <div className={`simple-form-container login-form`}>
      <SimpleForm
        submitButtonName="LogIn"
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
        fields={fields}
      />
    </div>
  );
};

export default Login;
