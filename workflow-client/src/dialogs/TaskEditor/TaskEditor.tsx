import React from "react";

import { OnSubmitType } from "@/types/utils";

import AsyncSearch from "@/components/form/AsyncSearch/AsyncSearch";
import { OptionType } from "@/components/form/AsyncSearch/SearchOptionType";
import { TextField, TextAreaField } from "@/components/form/TextInput";
import { Form, Field, useFormik, FormikProvider } from "formik";
import { FaTimes } from "react-icons/fa";

import useList from "@/hooks/useList";

import { useSearchBoardMembers } from "@/service/member";
import { useGetTags } from "@/service/tag";

import ItemContainer from "@/components/layout/ItemContainer";

import TagCard from "@/components/board/TagCard/TagCard";
import User from "@/components/board/User/User";

import "./TaskEditor.scss";

import TaskEditorActionButtons from "./TaskEditorActionButtons";
import { validationSchema } from "./formSchema";

type TaskEditorProps = {
  boardId: string;
  columnId?: string;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  isEditing?: boolean;
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
  onCancel,
  isEditing = false,
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

  const {
    data: members = [],
    isLoading: isMembersLoading,
    search,
  } = useSearchBoardMembers<(User & OptionType)[]>({
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
      <Form className="task-editor">
        <TaskEditorActionButtons
          onCancel={onCancel}
          saveButtonLabel={isEditing ? "Save Changes" : "Create"}
        />
        <section className="scrollbar">
          <div className="task-editor__text-inputs">
            <Field
              name="title"
              autoFocus={true}
              error={formik.touched.title && formik.errors.title}
              as={TextField}
            />
            <Field
              name="description"
              error={formik.touched.description && formik.errors.description}
              rows={6}
              resize="vertical"
              as={TextAreaField}
            />
          </div>
          <div className="task-editor__assignees">
            <label>Assignees</label>
            <AsyncSearch<User>
              options={members}
              selectedOptions={selectedAssignees}
              showSelectedValues={false}
              filterOptions={false}
              debounceCallback={search}
              onSelect={onAssigneeSelect}
              onClearSelection={clearSelectedAssignees}
            />
            <ItemContainer<User & OptionType>
              itemKey="_id"
              items={selectedAssignees}
              maxHeight={220}
              render={(assignee) => (
                <User username={assignee.username}>
                  <button className="btn" onClick={() => removeAssignee(assignee, "_id")}>
                    -
                  </button>
                </User>
              )}
            />
          </div>
          <div className="task-editor__tags">
            <label>Tags</label>

            <AsyncSearch<Tag>
              options={availableTags}
              showSelectedValues={false}
              selectedOptions={selectedTags}
              debounceTime={0}
              onSelect={addTag}
              onClearSelection={clearSelectedTags}
            />
            <ItemContainer<Tag & OptionType>
              itemKey="_id"
              items={selectedTags}
              maxHeight={220}
              render={(tag) => (
                <TagCard name={tag.label} color={tag.key}>
                  <button className="tag-card__remove" onClick={() => removeTag(tag, "_id")}>
                    <FaTimes />
                  </button>
                </TagCard>
              )}
            />
          </div>
        </section>
      </Form>
    </FormikProvider>
  );
};

export default TaskEditor;
