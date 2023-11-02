import React from "react";

import { OnSubmitType } from "@/types/utils";

import { TextField, TextAreaField } from "@/components/form/TextInput";
import { Field, Form, useFormik, FormikProvider } from "formik";
import { InferType } from "yup";

import "./BoardEditor.scss";

import { validationSchema } from "./formSchema";

export type BoardEditorType = InferType<typeof validationSchema>;

const BoardEditorForm: React.FC<{
  initialValues?: Partial<BoardEditorType>;
  onSubmit: OnSubmitType<BoardEditorType>;
}> = ({ initialValues, onSubmit }) => {
  const INITIAL_FORM_VALUES: BoardEditorType = {
    name: initialValues?.name || "",
    description: initialValues?.description || "",
  };

  const formik = useFormik({ initialValues: INITIAL_FORM_VALUES, validationSchema, onSubmit });

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
        <button
          // disabled={props.isSubmitting || !props.isValid}
          className="btn btn--glow login-form__btn"
          type="submit"
        >
          Create
        </button>
      </Form>
    </FormikProvider>
  );
};

export default BoardEditorForm;
