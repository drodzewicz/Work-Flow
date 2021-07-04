import React, { useState, useEffect, useContext } from "react";
import "./TaskEditor.scss";
import TextInput from "components/general/TextInput";
import { ModalContext, ModalActionType } from "context/ModalContext";

import Button from "components/general/Button/Button";
import { FormikProps, Form, Field } from "formik";
import { getBoardTags } from "service";
import TagManager from "./TagManager/TagManager";
import UserManager from "./UserManager/UserManager";
import { AlertContext, AlertActionType } from "context/AlertContext";
import { TaskEditorFormProps, FormValues, TagI } from ".";

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

  const [users, setUsers] = useState<any[]>([]);

  const [availableTags, setAvailableTags] = useState<TagI[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const initTask = async () => {
      const { data: tagsData } = await getBoardTags({ boardId });
      if (!!tagsData) setAvailableTags(tagsData.tags);
      if (submitType === "Update") {
        setSelectedTags(values.tags);
        setUsers(values.people);
      }
    };
    initTask();
    return () => {};
  }, [boardId, submitType, values]);

  useEffect(() => {
    if (status?.submitStatus === "SUCCESS") {
      modalDispatch({ type: ModalActionType.CLOSE });
      alertDispatch({ type: AlertActionType.SUCCESS, payload: { message: status.message } });
    }
    return () => {};
  }, [status, modalDispatch, alertDispatch]);
  const toggleSelectTag = (tagId: any) => {
    const foundTagIndex = selectedTags.findIndex((tag) => tag === tagId);
    if (foundTagIndex > -1) {
      return setSelectedTags((tags) => {
        const tempTags = [...tags];
        tempTags.splice(foundTagIndex, 1);
        return tempTags;
      });
    }
    setSelectedTags((tags) => {
      const tempTags = [...tags];
      tempTags.push(tagId);
      return tempTags;
    });
  };

  const filteredTags = () => {
    return availableTags.map((tag) => {
      const foundTag = selectedTags.find((_id) => _id === tag._id);
      return { ...tag, checked: !!foundTag };
    });
  };

  const submitHandler = () => {
    const people = users.map(({ _id }: { _id: any }) => _id);
    setValues((vals) => ({
      ...vals,
      people,
      tags: selectedTags,
    }));
    handleSubmit();
  };

  return (
    <section className="task-editor">
      <Form className="task-editor__inputs">
        <Field
          name="title"
          hasErrors={!!errors["title"]}
          helperText={errors["title"]}
          as={TextInput}
        />
        <Field
          name="description"
          hasErrors={!!errors["description"]}
          helperText={errors["description"]}
          as={TextInput}
        />
      </Form>
      <div className="task-editor__sidebar">
        <label>Users</label>
        <UserManager boardId={boardId} setUsers={setUsers} users={users} />
        <label>Tags</label>
        <TagManager tags={filteredTags()} selectTagHandler={toggleSelectTag} />
      </div>
      <div className="task-editor__btn">
        <Button
          onClick={submitHandler}
          disabled={isSubmitting || !isValid}
          type="submit"
          variant="glow">
          {submitType as String}
        </Button>
      </div>
    </section>
  );
};

export default TaskEditorForm;
