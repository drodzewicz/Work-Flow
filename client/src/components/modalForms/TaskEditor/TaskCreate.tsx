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
    return { title: "", description: "", people: [], tags: [] };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setStatus, props }) => {
    const { boardId, columnId } = props;
    createTask({
      boardId,
      columnId,
      payload: submittedData,
      res: (res) => {
        if (res.success) {
          setStatus({
            submitStatus: "SUCCESS",
            message: "new task created",
          });
        } else if (res.error) {
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
