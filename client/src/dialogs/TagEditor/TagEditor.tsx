import React from "react";

import { OnSubmitType } from "@/types/utils";

import ColorInput from "@/components/form/ColorInput/ColorInput";
import { TextField } from "@/components/form/TextInput";
import { Field, Form, useFormik, FormikProvider } from "formik";
import { InferType } from "yup";

import TagCard from "@/components/board/TagCard/TagCard";

import "./TagEditor.scss";

import { validationSchema } from "./formSchema";

type TagSchemaType = InferType<typeof validationSchema>;

export type TagEditorType = {
  initialValues?: Partial<TagSchemaType>;
  onSubmit: OnSubmitType<TagSchemaType>;
  isEditing?: boolean;
};

const TagEditor: React.FC<TagEditorType> = ({ initialValues, onSubmit, isEditing = false }) => {
  const INITIAL_FORM_VALUES: TagSchemaType = {
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
            aria-label="tag-name"
            className="label-name-input"
            error={formik.touched.name && formik.errors.name}
            as={TextField}
          />
          <Field name="key" aria-label="color" label="color" as={ColorInput} />
        </div>
        <button
          disabled={formik.isSubmitting || !formik.isValid}
          className="btn btn--glow "
          type="submit"
        >
          {isEditing ? "Save" : "Create"}
        </button>
      </Form>
    </FormikProvider>
  );
};

export default TagEditor;
