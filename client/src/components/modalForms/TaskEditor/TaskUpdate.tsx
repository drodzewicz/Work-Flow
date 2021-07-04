import React, { useEffect, useState } from "react";
import TaskEditor from "./TaskEditor";
import { withFormik } from "formik";
import { FormValues, validationSchema, TaskUpdateProps, TaskUpdateFormik } from ".";
import { getBoardTask, updateBoardTask } from "service/task";

const TaskUpdate: React.FC<TaskUpdateProps> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [task, setTask] = useState<FormValues>({
    title: "",
    description: "",
    people: [],
    tags: [],
  });

  useEffect(() => {
    const getTaskDetails = async () => {
      const { boardId, taskId } = props;
      setLoading(true);
      const { data } = await getBoardTask({
        boardId,
        taskId: taskId || "",
      });
      const { title, description, people, tags } = data.task;
      setTask({ title, description, people, tags });
      setLoading(false);
    };
    getTaskDetails();
    return () => {};
  }, []);
  if (isLoading) {
    return <div>hello</div>;
  } else {
    return <TaskUpdateWrapper {...props} initialValues={task} submitType="Update" />;
  }
};

const TaskUpdateWrapper = withFormik<TaskUpdateFormik, FormValues>({
  mapPropsToValues: (props) => {
    return { ...props.initialValues };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setStatus, props }) => {
    const { boardId, taskId } = props;
    const res = await updateBoardTask({
      boardId,
      taskId,
      payload: submittedData,
    });
    if (res.status === 200) {
      setStatus({
        submitStatus: "SUCCESS",
        message: "task updated",
      });
    } else {
      setStatus({
        submitStatus: "ERROR",
        message: "error - while updating task",
      });
    }
  },
})(TaskEditor);

export default TaskUpdate;
