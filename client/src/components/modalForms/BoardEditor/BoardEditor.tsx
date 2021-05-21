import React, { useState, useContext, useEffect } from "react";
import "./BoardEditor.scss";
import Button from "components/general/Button/Button";
import { Formik, Field, Form } from "formik";
import TextInput from "components/general/TextInput/TextInput";
import { ModalContext } from "context/ModalContext";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";

import { getBoard, createBoard, updateBoard } from "service";
import { useHistory } from "react-router-dom";
import { WarningNotificationContext } from "context/WarningNotificationContext";
import { validationSchema, BoardEditorProps } from "./";

const BoardEditor: React.FC<BoardEditorProps> = ({ boardId, submitType }) => {
  const [, dispatchModal] = useContext(ModalContext);
  const [, warningNotificationDispatch] = useContext(WarningNotificationContext);
  const [loadingBoardInfo, setLoadingBoardInfo] = useState(false);
  const [initialVals, setInitialVals] = useState({
    name: "",
    description: "",
  });

  const history = useHistory();

  useEffect(() => {
    const getBoardInfo = async () => {
      setLoadingBoardInfo(true);
      const { data } = await getBoard({ boardId: boardId as number, short: true });
      if (!!data) {
        const { name, description } = data;
        setInitialVals({ name, description });
        setLoadingBoardInfo(false);
      }
    };
    if (submitType === "Update") getBoardInfo();
    return () => {};
  }, [boardId, submitType]);

  const submitButtonClick = async (submittedData: any, { setSubmitting }: any) => {
    let response;
      if (!!boardId) {
        response = await updateBoard({
          boardId,
          setLoading: setSubmitting,
          payload: submittedData,
        });
      } else {
        response = await createBoard({
          setLoading: setSubmitting,
          payload: submittedData,
        });
      }
      const { data } = response;
    if (!!data) {
      dispatchModal({ type: "CLOSE" });
      const boardId = data.board._id;
      warningNotificationDispatch({ type: "SUCCESS", payload: { message: data.message } });
      history.push(`/board/${boardId}`);
    }
  };

  return (
    <div className="board-form-container-wrapper">
      <LoadingOverlay show={loadingBoardInfo} opacity={0}>
        <div className="board-form-container">
          <Formik
            validationSchema={validationSchema}
            initialValues={initialVals}
            onSubmit={submitButtonClick}>
            {({ isSubmitting, isValid, errors }) => (
              <>
                <LoadingOverlay show={isSubmitting} opacity={0.5} />
                <Form>
                  <div className="fields">
                    <Field
                      className="board-name-input"
                      label="board name"
                      name="name"
                      hasErrors={!!errors["name"]}
                      helperText={errors["name"]}
                      classes={["board-name-field"]}
                      as={TextInput}
                    />
                    <Field
                      name={"description"}
                      classes={["board-description-field"]}
                      multiline={{ rows: 7, max: 7 }}
                      hasErrors={!!errors["description"]}
                      helperText={errors["description"]}
                      as={TextInput}
                    />
                  </div>
                  <Button
                    disabled={isSubmitting || !isValid}
                    variant="glow"
                    className="btn-submit"
                    type="submit">
                    {submitType as String}
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </LoadingOverlay>
    </div>
  );
};

export default BoardEditor;
