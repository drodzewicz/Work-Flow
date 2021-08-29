import React from "react";
import TaskEditor from "./TaskEditor";
import { withFormik, FormikProps } from "formik";
import { FormValues, TaskCreateProps, validationSchema, TaskEditorFormProps } from ".";
import { createTask } from "service/task";

const TaskCreate: React.FC<Omit<TaskEditorFormProps, "submitType"> & FormikProps<FormValues>> = (
  props
) => {
  return <TaskEditor {...props} submitType="Create" />;
};

const TaskCreateWrapper = withFormik<TaskCreateProps, FormValues>({
  mapPropsToValues: () => {
    return {
      _id: "",
      title: "",
      description: "",
      people: [],
      tags: [],
      author: { _id: "", username: "" },
    };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setStatus, setSubmitting, props }) => {
    const { boardId, columnId } = props;
    setSubmitting(true);
    createTask({
      boardId,
      columnId,
      payload: submittedData,
      res: (res) => {
        const { error } = res;
        setSubmitting(false);
        if (!error) {
          setStatus({
            submitStatus: "SUCCESS",
            message: "new task created",
          });
        } else {
          setStatus({
            submitStatus: "ERROR",
            message: "error - while creating new task",
          });
        }
      },
    });
  },
})(TaskCreate);

export default TaskCreateWrapper;
