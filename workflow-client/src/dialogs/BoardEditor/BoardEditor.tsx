import React from "react";

import { OnSubmitType } from "@/types/general/utils";

import { BoardEditorType } from "./types";

import useAuthClient from "@/hooks/useClient";
import { Field, Form, Formik, useFormik, FormikProvider } from "formik";

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

  const formik = useFormik({ initialValues: INITIAL_FORM_VALUES, validationSchema, onSubmit });

  const client = useAuthClient();

  return (
    <FormikProvider value={formik}>
      <Form className="board-editor">
        <Field
          autoFocus={true}
          name="name"
          className="board-editor__field__name"
          error={formik.touched.name && formik.errors.name}
          as={TextField}
        />
        <Field
          name="description"
          className="board-editor__field__description"
          error={formik.touched.description && formik.errors.description}
          as={TextAreaField}
        />
        <Button
          // disabled={props.isSubmitting || !props.isValid}
          variant="glow"
          className="login-form__btn"
          type="submit"
        >
          Create
        </Button>
      </Form>
    </FormikProvider>
  );
};

export default BoardEditorForm;
