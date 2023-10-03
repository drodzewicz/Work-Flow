import React from "react";

import { OnSubmitType } from "@/types/utils";

import AsyncSearch from "@/components/form/AsyncSearch/AsyncSearch";
import { OptionType } from "@/components/form/AsyncSearch/SearchOptionType";
import { TextField, TextAreaField } from "@/components/form/TextInput";
import UserSelect, { DefaultOption } from "@/components/form/UserSelect/UserSelect";
import { AxiosResponse } from "axios";
import { Form, Field, useFormik, FormikProvider } from "formik";

import useAuthClient from "@/hooks/useClient";
import useList from "@/hooks/useList";

import { useSearchBoardMembers } from "@/service/member";
import memberURL from "@/service/member/url";
import { useGetTags } from "@/service/tag";

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
    tags?: Tag[];
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

  const { data: availableTags } = useGetTags({ boardId });

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

  const { data: members = [], search } = useSearchBoardMembers<(User & OptionType)[]>({
    boardId,
    limit: 5,
    page: 1,
    keepPreviousData: true,
    select: (data) =>
      data?.members?.map(({ user }) => ({ ...user, id: user._id, label: user.username })),
  });

  const onAssigneeSelect = (option: unknown) => {
    addAssignee(option as User);
    search("");
  };

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
            <AsyncSearch
              options={members}
              showSelectedValues={false}
              onChange={search}
              onSelect={onAssigneeSelect}
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
            <select>
              {availableTags?.map((tag) => (
                <option key={tag._id}>{tag.name}</option>
              ))}
            </select>
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
