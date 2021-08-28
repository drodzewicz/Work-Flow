import React, { useState, useEffect, useRef } from "react";
import BoardEditorForm from "./BoardEditorForm";
import { withFormik } from "formik";
import { validationSchema, BoardEditorProps, FormValues } from ".";
import { FormikProps } from "formik";
import LoadingOverlay from "components/layout/LoadingOverlay";
import { updateBoard, getBoard } from "service";
import axios, { CancelTokenSource } from "axios";

const BoardUpdate: React.FC<BoardEditorProps & FormikProps<FormValues>> = (props) => {
  return <BoardEditorForm {...props} submitType="Update" />;
};

const BoardUpdateWithFormik = withFormik<BoardEditorProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      name: props.initialValues?.name || "",
      description: props.initialValues?.description || "",
    };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setSubmitting, setStatus, props }) => {
    const { boardId } = props;
    const response = await updateBoard({
      boardId: boardId as string,
      setLoading: setSubmitting,
      payload: submittedData,
    });
    const { data } = response;
    if (!!data) {
      const { boardId, message } = data;
      setStatus({ submitStatus: "SUCCESS", boardId, message });
    }
  },
})(BoardUpdate);

const BoardUpdateWrapper: React.FC<BoardEditorProps> = (props) => {
  const [loadingBoardInfo, setLoadingBoardInfo] = useState<boolean>(false);
  const [initialVals, setInitialVals] = useState<FormValues>({
    name: "",
    description: "",
  });
  const source = useRef<CancelTokenSource | null>(null);

  useEffect(() => {
    source.current = axios.CancelToken.source();

    const getBoardInfo = async () => {
      setLoadingBoardInfo(true);
      const { data } = await getBoard({
        boardId: props.boardId as string,
        short: true,
        cancelToken: source.current?.token,
      });
      if (!!data) {
        const { name, description } = data;
        setInitialVals({ name, description });
        setLoadingBoardInfo(false);
      }
    };
    getBoardInfo();
    return () => {
      source.current?.cancel();
    };
  }, [props.boardId]);

  return (
    <LoadingOverlay show={loadingBoardInfo} opacity={0} className="board-editor">
      <BoardUpdateWithFormik {...props} initialValues={initialVals} />
    </LoadingOverlay>
  );
};

export default BoardUpdateWrapper;
