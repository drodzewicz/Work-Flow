import React from "react";

import { OnSubmitType } from "@/types/general/utils";

import { BoardEditorType } from "./types";

import { Field, Form, Formik } from "formik";

import Button from "@/components/general/Button";
import { TextField, TextAreaField } from "@/components/general/TextInput";

import "./BoardEditor.scss";

import { validationSchema } from "./formSchema";

const BoardEditorForm: React.FC<{
  initialValues?: Partial<BoardEditorType>;
  onSubmit: OnSubmitType<BoardEditorType>;
}> = ({ initialValues, onSubmit }) => {
  const INITIAL_FORM_VALUES: BoardEditorType = {
    name: initialValues?.name || "",
    description: initialValues?.description || "",
  };

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => (
        <Form className="board-editor">
          <Field
            autoFocus={true}
            name="name"
            className="board-editor__field__name"
            error={props.touched.name && props.errors.name}
            as={TextField}
          />
          <Field
            name="description"
            className="board-editor__field__description"
            error={props.touched.description && props.errors.description}
            as={TextAreaField}
          />
          <Button
            // disabled={props.isSubmitting || !props.isValid}
            variant="glow"
            className="login-form__btn"
            type="submit"
          >
            Log In
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BoardEditorForm;
