import React, { useState, useEffect, useContext } from "react";

import { TagI, UserShortI } from "@/types/general";

import { TaskEditorFormProps, FormValues } from "./types";

import { getBoardTags } from "@/service";
import { FormikProps, Form, Field } from "formik";
import { FaTags, FaUserFriends } from "react-icons/fa";

import { AlertContext, AlertActionType } from "@/context/AlertContext";
import { ModalContext, ModalActionType } from "@/context/ModalContext";

import Button from "@/components/general/Button/Button";
import { TextField, TextAreaField } from "@/components/general/TextInput";

import TagManager from "@/dialogs/TaskEditor/TagManager";
import UserManager from "@/dialogs/TaskEditor/UserManager";

import "./TaskEditor.scss";

const TaskEditorForm: React.FC<TaskEditorFormProps & FormikProps<FormValues>> = (props) => {
  const {
    values,
    setValues,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    submitType,
    status,
    boardId,
  } = props;

  const { modalDispatch } = useContext(ModalContext);
  const { alertDispatch } = useContext(AlertContext);

  const [users, setUsers] = useState<UserShortI[]>([]);

  const [availableTags, setAvailableTags] = useState<TagI[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagI[]>([]);

  useEffect(() => {
    const initTask = async () => {
      const { data: tagsData } = await getBoardTags({ boardId });
      if (tagsData) setAvailableTags(tagsData.tags);
      if (submitType === "Update") {
        setSelectedTags(values.tags);
        setUsers(values.people);
      }
    };
    initTask();
  }, [boardId, submitType, values.tags, values.people]);

  useEffect(() => {
    if (status?.submitStatus === "SUCCESS") {
      modalDispatch({ type: ModalActionType.CLOSE });
      alertDispatch({ type: AlertActionType.SUCCESS, payload: { message: status.message } });
    } else if (status?.submitStatus === "ERROR") {
      alertDispatch({ type: AlertActionType.ERROR, payload: { message: status.message } });
    }
  }, [status, modalDispatch, alertDispatch]);
  const toggleSelectTag = (selectedTag: TagI) => {
    return setSelectedTags((tags) => {
      let tempTags = [...tags];
      tempTags = tempTags.filter(({ _id }) => _id !== selectedTag._id);
      if (tempTags.length === tags.length) {
        tempTags.push(selectedTag);
      }
      return tempTags;
    });
  };

  const filteredTags = () => {
    return availableTags.map((tag) => {
      const foundTag = selectedTags.find(({ _id }) => _id === tag._id);
      return { ...tag, checked: !!foundTag };
    });
  };

  const submitHandler = () => {
    setValues((vals) => ({
      ...vals,
      people: users,
      tags: selectedTags,
    }));
    handleSubmit();
  };

  return (
    <section className="task-editor">
      <Form className="task-editor__inputs">
        <Field
          autoFocus={true}
          className="task-editor__inputs__field"
          name="title"
          error={errors["title"]}
          as={TextField}
        />
        <Field
          className="task-editor__inputs__textArea"
          name="description"
          error={errors["description"]}
          as={TextAreaField}
        />
      </Form>
      <div className="task-editor__sidebar">
        <p className="task-editor__sidebar__label">
          <FaUserFriends />
          <label>Users</label>
        </p>
        <UserManager boardId={boardId} setUsers={setUsers} users={users} />
        <p className="task-editor__sidebar__label">
          <FaTags />
          <label>Tags</label>
        </p>
        <TagManager tags={filteredTags()} selectTagHandler={toggleSelectTag} />
      </div>
      <div className="task-editor__btn">
        <Button
          onClick={submitHandler}
          disabled={isSubmitting || !isValid}
          type="submit"
          variant="glow"
        >
          {submitType}
        </Button>
      </div>
    </section>
  );
};

export default TaskEditorForm;
