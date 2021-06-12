import React from "react";
import BoardEditorForm from "./BoardEditorForm";
import { withFormik } from "formik";
import { validationSchema, BoardEditorProps, FormValues } from "./";
import { FormikProps } from "formik";
import { createBoard } from "service";

const BoardCreate: React.FC<BoardEditorProps & FormikProps<FormValues>> = (props) => {
  return <BoardEditorForm {...props} submitType="Create" />;
};

const BoardCreateWrapper = withFormik<BoardEditorProps, FormValues>({
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setSubmitting, setStatus }) => {
    const response = await createBoard({
      setLoading: setSubmitting,
      payload: submittedData,
    });
    const { data } = response;
    if (!!data) {
      setStatus({ submitStatus: "SUCCESS", boardId: data.board._id, message: data.message });
    }
  },
})(BoardCreate);

export default BoardCreateWrapper;
