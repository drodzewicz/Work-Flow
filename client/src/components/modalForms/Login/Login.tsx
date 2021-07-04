import React, { useContext, useEffect } from "react";
import { FormikProps, Form, Field, withFormik } from "formik";
import { FormValues } from ".";
import TextInput from "components/general/TextInput";
import Button from "components/general/Button";
import { UserContext, UserActionType } from "context/UserContext";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { login } from "service";
import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string().max(25, "username is too long").required("field is required"),
  password: Yup.string().min(5, "must be at least 5 characters").required("field is required"),
});

const LoginForm: React.FC<FormikProps<FormValues>> = (props) => {
  const { errors, isSubmitting, isValid, status, setErrors } = props;
  const { modalDispatch } = useContext(ModalContext);
  const { userDispatch } = useContext(UserContext);

  useEffect(() => {
    if (status?.submitStatus === "SUCCESS") {
      userDispatch({
        type: UserActionType.LOGIN_SUCCESS,
        payload: { user: status?.user, token: status?.token },
      });
      modalDispatch({ type: ModalActionType.CLOSE });
    } else if (status?.submitStatus === "ERROR") {
      setErrors({ username: "bad username", password: "bad password" });
    }
    return () => {};
  }, [status, userDispatch, modalDispatch, setErrors]);

  return (
    <Form>
      <Field
        name="username"
        hasErrors={!!errors["username"]}
        helperText={errors["username"]}
        as={TextInput}
      />
      <Field
        name="password"
        hasErrors={!!errors["password"]}
        helperText={errors["password"]}
        type="password"
        as={TextInput}
      />
      <Button
        disabled={isSubmitting || !isValid}
        variant="glow"
        className="btn-submit"
        type="submit">
        Log In
      </Button>
    </Form>
  );
};

const LoginWithFormik = withFormik<{}, FormValues>({
  mapPropsToValues: () => {
    return { username: "", password: "" };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setSubmitting, setStatus }) => {
    const { data, error } = await login({ setLoading: setSubmitting, payload: submittedData });
    if (!!data) {
      setStatus({ submitStatus: "SUCCESS", token: data.token, user: data.user });
    } else if (!!error) {
      setStatus({ submitStatus: "ERROR", boardId: data.board._id, message: data.message });
    }
  },
})(LoginForm);

export default LoginWithFormik;
