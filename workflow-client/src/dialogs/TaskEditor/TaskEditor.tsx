import React from "react";

import { OnSubmitType } from "@/types/utils";

import { TextField, TextAreaField } from "@/components/form/TextInput";
import UserSelect, { DefaultOption } from "@/components/form/UserSelect/UserSelect";
import { AxiosResponse } from "axios";
import { Form, Field, useFormik, FormikProvider } from "formik";

import useAuthClient from "@/hooks/useClient";
import useList from "@/hooks/useList";

import User from "@/components/board/User/User";

import "./TaskEditor.scss";

import { validationSchema } from "./formSchema";

type TaskEditorProps = {
  boardId: string;
  columnId?: string;
  onSubmit?: (data: any) => void;
  initialValues?: {
    title?: string;
    description?: string;
    tags?: string[];
    assignees?: User[];
  };
};

const TaskEditor: React.FC<TaskEditorProps> = ({ boardId, columnId, initialValues, onSubmit }) => {
  const INITIAL_FORM_VALUES = {
    title: initialValues?.title || "",
    description: initialValues?.title || "",
  };

  const {
    data: assignees,
    addItem: addAssignee,
    removeItem: removeAssignee,
  } = useList<User>(initialValues?.assignees ?? []);

  const client = useAuthClient();

  const onSubmitHandler: OnSubmitType<any> = async (values) => {
    values.assignees = assignees?.map((user) => user._id);
    values.columnId = columnId;
    onSubmit?.(values);
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUES,
    validationSchema: validationSchema,
    onSubmit: onSubmitHandler,
  });

  const loadMembers = async (searchTerm: string) =>
    client.get(`/boards/${boardId}/members`, {
      params: { limit: 5, page: 1, username: searchTerm },
    });

  const transformData = (response: AxiosResponse) =>
    response.data?.members?.map((member: Member) => ({
      value: member?.user?._id,
      label: member?.user?.username,
      member,
    }));

  return (
    <FormikProvider value={formik}>
      <Form>
        <section className="task-editor">
          <div>
            <Field
              name="title"
              autoFocus={true}
              error={formik.touched.title && formik.errors.title}
              as={TextField}
            />
            <Field
              name="description"
              error={formik.touched.description && formik.errors.description}
              as={TextAreaField}
            />
          </div>
          <div>
            <UserSelect<
              AxiosResponse<{ totalCount: number; members: Member[] }>,
              DefaultOption & { member: Member }
            >
              loadData={loadMembers}
              isOptionDisabled={({ value }) =>
                !!assignees.find((assignee) => assignee._id === value)
              }
              transformData={transformData}
              onSelect={(option) => addAssignee(option.member.user)}
            />
            <div>
              {assignees.map((assignee) => (
                <User key={assignee._id} username={assignee.username}>
                  <button className="btn" onClick={() => removeAssignee(assignee, "_id")}>
                    -
                  </button>
                </User>
              ))}
            </div>
          </div>
          <button
            // disabled={props.isSubmitting || !props.isValid}
            className="btn bnt--glow"
            type="submit"
          >
            Save
          </button>
        </section>
      </Form>
    </FormikProvider>
  );
};

export default TaskEditor;
