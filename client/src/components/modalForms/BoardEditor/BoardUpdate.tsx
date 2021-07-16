import React, { useState, useEffect } from "react";
import BoardEditorForm from "./BoardEditorForm";
import { withFormik } from "formik";
import { validationSchema, BoardEditorProps, FormValues } from "./";
import { FormikProps } from "formik";
import LoadingOverlay from "components/layout/LoadingOverlay";
import { updateBoard, getBoard } from "service";

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

  useEffect(() => {
    const getBoardInfo = async () => {
      setLoadingBoardInfo(true);
      const { data } = await getBoard({ boardId: props.boardId as string, short: true });
      if (!!data) {
        const { name, description } = data;
        setInitialVals({ name, description });
        setLoadingBoardInfo(false);
      }
    };
    getBoardInfo();
    return () => {};
  }, [props.boardId]);

  return (
    <LoadingOverlay show={loadingBoardInfo} opacity={0}>
      <BoardUpdateWithFormik {...props} initialValues={initialVals} />
    </LoadingOverlay>
  );
};

export default BoardUpdateWrapper;
