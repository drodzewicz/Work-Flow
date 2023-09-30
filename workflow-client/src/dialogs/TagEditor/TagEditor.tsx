import React from "react";

import { OnSubmitType } from "@/types/utils";

import ColorInput from "@/components/form/ColorInput/ColorInput";
import { TextField, TextAreaField } from "@/components/form/TextInput";
import { Field, Form, useFormik, FormikProvider } from "formik";
import { InferType } from "yup";

import "./TagEditor.scss";

import { validationSchema } from "./formSchema";

export type TagEditorType = InferType<typeof validationSchema>;

const TagEditor: React.FC<{
  initialValues?: Partial<TagEditorType>;
  onSubmit: OnSubmitType<TagEditorType>;
}> = ({ initialValues, onSubmit }) => {
  const INITIAL_FORM_VALUES: TagEditorType = {
    key: initialValues?.key || "",
    name: initialValues?.name || "",
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
          name="key"
          className="board-editor__field__description"
          error={formik.touched.key && formik.errors.key}
          as={ColorInput}
        />
        <button
          // disabled={props.isSubmitting || !props.isValid}
          className="btn--glow login-form__btn"
          type="submit"
        >
          Create
        </button>
      </Form>
    </FormikProvider>
  );
};

export default TagEditor;
