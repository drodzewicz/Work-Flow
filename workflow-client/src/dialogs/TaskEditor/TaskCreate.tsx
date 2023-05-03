import React from "react";

import { withFormik, FormikProps } from "formik";

import { createTask } from "@/service/task";

import TaskEditor from "./TaskEditor";
import { validationSchema } from "./formSchema";
import { FormValues, TaskCreateProps, TaskEditorFormProps } from "./types";

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
      res: (res: any) => {
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
