import React from "react";

import { OnSubmitType } from "@/types/utils";

import AsyncSearch from "@/components/form/AsyncSearch/AsyncSearch";
import { OptionType } from "@/components/form/AsyncSearch/SearchOptionType";
import { TextField, TextAreaField } from "@/components/form/TextInput";
import { Form, Field, useFormik, FormikProvider } from "formik";
import { FaTag, FaTimes, FaUsers } from "react-icons/fa";

import useList from "@/hooks/useList";

import { useSearchBoardMembers } from "@/service/member";
import { useGetTags } from "@/service/tag";

import ItemContainer from "@/components/layout/ItemContainer";

import { CustomUserOption, CustomTagOption } from "@/components/board/CustomOption";
import TagCard from "@/components/board/TagCard/TagCard";
import User from "@/components/board/User/User";

import "./TaskEditor.scss";

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
    initialValues.assignees?.map((user) => ({ ...user, id: user._id, label: user.username })),
  );

  const {
    data: selectedTags,
    addItem: addTag,
    removeItem: removeTag,
    clear: clearSelectedTags,
  } = useList<Tag & OptionType>(
    initialValues.tags?.map((tag) => ({ ...tag, id: tag._id, label: tag.name })),
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
      <Form className="task-editor">
        <div className="task-editor__action-buttons">
          <button
            disabled={!formik.isValid || formik.isSubmitting}
            className="btn btn--glow"
            type="submit"
          >
            {isEditing ? "Save Changes" : "Create"}
          </button>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
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
          <div className="task-editor__other-options">
            <div className="task-editor__assignees">
              <label htmlFor="member-search">
                <FaUsers />
                Assignees
              </label>
              <AsyncSearch<User>
                id="member-search"
                options={members}
                selectedOptions={selectedAssignees}
                showSelectedValues={false}
                filterOptions={false}
                debounceCallback={search}
                onSelect={onAssigneeSelect}
                onClearSelection={clearSelectedAssignees}
                noResultMessage="Board member not found"
                renderOption={(option) => (
                  <CustomUserOption username={option.username} imageSrc={option.avatarImageURL} />
                )}
              />
              <ItemContainer<User & OptionType>
                itemKey="_id"
                items={selectedAssignees}
                maxHeight={220}
                noContentMessage="Assignee not selected..."
                render={(assignee) => (
                  <User username={assignee.username}>
                    <button
                      className="btn remove-assignee-btn"
                      onClick={() => removeAssignee(assignee, "_id")}
                    >
                      <FaTimes />
                    </button>
                  </User>
                )}
              />
            </div>
            <div className="task-editor__tags">
              <label htmlFor="tag-search">
                <FaTag />
                Tags
              </label>

              <AsyncSearch<Tag>
                id="tag-search"
                options={availableTags}
                showSelectedValues={false}
                selectedOptions={selectedTags}
                debounceTime={0}
                onSelect={addTag}
                onClearSelection={clearSelectedTags}
                renderOption={(option) => <CustomTagOption color={option.key} name={option.name} />}
              />
              <ItemContainer<Tag & OptionType>
                itemKey="_id"
                items={selectedTags}
                maxHeight={220}
                noContentMessage="Tag not selected..."
                render={(tag) => (
                  <TagCard name={tag.label} color={tag.key}>
                    <button className="tag-card__remove" onClick={() => removeTag(tag, "_id")}>
                      <FaTimes />
                    </button>
                  </TagCard>
                )}
              />
            </div>
          </div>
        </section>
      </Form>
    </FormikProvider>
  );
};

export default TaskEditor;
