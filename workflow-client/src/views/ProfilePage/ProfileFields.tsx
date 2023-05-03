import React, { useState } from "react";

import { FormValues, ProfileFieldsProps } from "./types";

import { updateCredentials } from "@/service";
import { FormikProps, Form, Field, withFormik } from "formik";

import Button from "@/components/general/Button";
import { TextField } from "@/components/general/TextInput";

import { validationSchema } from "./formSchema";

const ProfileFields: React.FC<FormikProps<FormValues>> = (props) => {
  const { errors, isSubmitting, isValid, resetForm } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const editFormHandler = () => setIsEditing(true);
  const cancelFormChangesHandler = () => {
    resetForm();
    setIsEditing(false);
  };

  return (
    <Form className="profile__inputs">
      <Field disabled={!isEditing} name="username" error={errors["username"]} as={TextField} />
      <Field disabled={!isEditing} name="email" error={errors["email"]} as={TextField} />
      <Field disabled={!isEditing} name="name" error={errors["name"]} as={TextField} />
      <Field disabled={!isEditing} name="surname" error={errors["surname"]} as={TextField} />
      {isEditing ? (
        <>
          <Button disabled={isSubmitting || !isValid} variant="glow" type="submit">
            Update
          </Button>
          <Button onClick={cancelFormChangesHandler} type="button">
            Cancel
          </Button>
        </>
      ) : (
        <Button onClick={editFormHandler} className="btn-edit" type="button">
          Edit
        </Button>
      )}
    </Form>
  );
};

const ProfileFieldsWithFormik = withFormik<ProfileFieldsProps, FormValues>({
  mapPropsToValues: (props) => {
    const { username, email, name, surname } = props;
    return { username, email, name, surname };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setSubmitting, setErrors }) => {
    const { error } = await updateCredentials({
      setLoading: setSubmitting,
      payload: submittedData,
    });

    if (error) {
      setErrors(error.message);
    }
  },
})(ProfileFields);

export default ProfileFieldsWithFormik;
