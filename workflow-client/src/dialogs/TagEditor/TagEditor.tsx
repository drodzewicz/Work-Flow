import React from "react";

import { OnSubmitType } from "@/types/utils";

import ColorInput from "@/components/form/ColorInput/ColorInput";
import { TextField, TextAreaField } from "@/components/form/TextInput";
import { Field, Form, useFormik, FormikProvider } from "formik";
import { InferType } from "yup";

import TagCard from "@/components/board/TagCard/TagCard";

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
      <Form className="tag-editor">
        <TagCard color={formik.values.key} name={formik.values.name || "tag name..."} />
        <div className="tag-editor__inputs">
          <Field
            autoFocus={true}
            name="name"
            className="label-name-input"
            error={formik.touched.name && formik.errors.name}
            as={TextField}
          />
          <Field name="key" label="color" as={ColorInput} />
        </div>
        <button
          // disabled={props.isSubmitting || !props.isValid}
          className="btn btn--glow "
          type="submit"
        >
          Create
        </button>
      </Form>
    </FormikProvider>
  );
};

export default TagEditor;
