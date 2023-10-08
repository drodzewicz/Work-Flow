import React from "react";

import { OnSubmitType } from "@/types/utils";

import AsyncSearch from "@/components/form/AsyncSearch/AsyncSearch";
import { OptionType } from "@/components/form/AsyncSearch/SearchOptionType";
import { TextField, TextAreaField } from "@/components/form/TextInput";
import { Form, Field, useFormik, FormikProvider } from "formik";

import useList from "@/hooks/useList";

import { useSearchBoardMembers } from "@/service/member";
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

const TaskEditor: React.FC<TaskEditorProps> = ({
  boardId,
  columnId,
  onSubmit,
  initialValues = { title: "", description: "", assignees: [], tags: [] },
}) => {
  const {
    data: selectedAssignees,
    addItem: addAssignee,
    removeItem: removeAssignee,
    clear: clearSelectedAssignees,
  } = useList<User & OptionType>(
    initialValues.assignees?.map((user) => ({ ...user, id: user._id, label: user.username }))
  );

  const {
    data: selectedTags,
    addItem: addTag,
    removeItem: removeTag,
    clear: clearSelectedTags,
  } = useList<Tag & OptionType>(
    initialValues.tags?.map((tag) => ({ ...tag, id: tag._id, label: tag.name }))
  );

  const { data: availableTags = [] } = useGetTags<(Tag & OptionType)[]>({
    boardId,
    select: (data) => data?.map((tag) => ({ ...tag, id: tag._id, label: tag.name })),
  });

  const { data: members = [], search } = useSearchBoardMembers<(User & OptionType)[]>({
    boardId,
    limit: 5,
    page: 1,
    keepPreviousData: true,
    select: (data) =>
      data?.members?.map(({ user }) => ({ ...user, id: user._id, label: user.username })),
  });

  const onSubmitHandler: OnSubmitType<any> = async (values) => {
    values.assignees = selectedAssignees.map((user) => user._id);
    values.tags = selectedTags.map((tag) => tag._id);
    values.columnId = columnId;
    onSubmit?.(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmitHandler,
  });

  const onAssigneeSelect = (option: unknown) => {
    addAssignee(option as User & OptionType);
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
            <AsyncSearch<User>
              options={members}
              selectedOptions={selectedAssignees}
              showSelectedValues={false}
              filterOptions={false}
              debounceCallback={search}
              onSelect={onAssigneeSelect}
              onClearSelection={clearSelectedAssignees}
            />
            <div>
              {selectedAssignees.map((assignee) => (
                <User key={assignee._id} username={assignee.username}>
                  <button className="btn" onClick={() => removeAssignee(assignee, "_id")}>
                    -
                  </button>
                </User>
              ))}
            </div>
            <AsyncSearch<Tag>
              options={availableTags}
              showSelectedValues={false}
              selectedOptions={selectedTags}
              debounceTime={0}
              onSelect={addTag}
              onClearSelection={clearSelectedTags}
            />
            <div>
              {selectedTags.map((tag) => (
                <div key={tag._id}>
                  {tag.name}
                  <button className="btn" onClick={() => removeTag(tag, "_id")}>
                    -
                  </button>
                </div>
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
