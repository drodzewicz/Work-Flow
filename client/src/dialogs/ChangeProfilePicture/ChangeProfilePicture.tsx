import React, { useContext, useEffect } from "react";
import { FormikProps, Form, Field, withFormik } from "formik";
import { TextField } from "components/general/TextInput";
import Button from "components/general/Button";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { changeAvatar } from "service";
import { FormValues, ChangeProfilePictureProps } from ".";
import * as Yup from "yup";
import "./ChangeProfilePicture.scss";

export const validationSchema = Yup.object({
  imageLink: Yup.string().url().required("image link is required"),
});

const ChangeProfilePicture: React.FC<FormikProps<FormValues>> = (props) => {
  const { errors, isSubmitting, isValid, status } = props;
  const { modalDispatch } = useContext(ModalContext);

  useEffect(() => {
    if (status?.submitStatus === "SUCCESS") {
      modalDispatch({ type: ModalActionType.CLOSE });
    }
    return () => {};
  }, [status, modalDispatch]);

  return (
    <Form className="change-profile-picture">
      <Field name="imageLink" label="avatar image URL" error={errors["imageLink"]} as={TextField} />
      <Button
        disabled={isSubmitting || !isValid}
        variant="glow"
        className="change-profile-picture__update-btn"
        type="submit">
        Update
      </Button>
    </Form>
  );
};

const ChangeProfilePictureWithFormik = withFormik<ChangeProfilePictureProps, FormValues>({
  mapPropsToValues: () => {
    return { imageLink: "", password: "" };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setSubmitting, setStatus, props }) => {
    const { data } = await changeAvatar({
      payload: { imageURL: submittedData.imageLink },
      setLoading: setSubmitting,
    });
    if (!!data) {
      props.changeProfilePic(submittedData.imageLink);
      setStatus({ submitStatus: "SUCCESS" });
    }
  },
})(ChangeProfilePicture);

export default ChangeProfilePictureWithFormik;
