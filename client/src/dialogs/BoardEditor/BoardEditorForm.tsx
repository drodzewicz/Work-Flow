import React, { useContext, useEffect } from "react";
import { FormikProps, Form, Field } from "formik";
import { BoardEditorFormProps, FormValues } from ".";
import { TextField, TextAreaField } from "components/general/TextInput";
import Button from "components/general/Button";
import { AlertContext, AlertActionType } from "context/AlertContext";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { useHistory } from "react-router-dom";
import "./BoardEditor.scss";

const BoardEditorForm: React.FC<BoardEditorFormProps & FormikProps<FormValues>> = (props) => {
  const { errors, isSubmitting, isValid, submitType, status } = props;
  const { modalDispatch } = useContext(ModalContext);
  const { alertDispatch } = useContext(AlertContext);
  const history = useHistory();

  useEffect(() => {
    if (status?.submitStatus === "SUCCESS") {
      modalDispatch({ type: ModalActionType.CLOSE });
      alertDispatch({ type: AlertActionType.SUCCESS, payload: { message: status.message } });
      history.push(`/board/${status.boardId}`);
    }
    return () => {};
  }, [status, modalDispatch, history, alertDispatch]);

  return (
    <Form className="board-editor">
      <Field
        autoFocus={true}
        name="name"
        className="board-editor__field__name"
        error={errors["name"]}
        disabled={isSubmitting}
        as={TextField}
      />
      <Field
        name="description"
        className="board-editor__field__description"
        error={errors["description"]}
        disabled={isSubmitting}
        as={TextAreaField}
      />
      <Button
        className="board-editor__btn"
        disabled={isSubmitting || !isValid}
        variant="glow"
        type="submit">
        {submitType as String}
      </Button>
    </Form>
  );
};

export default BoardEditorForm;
