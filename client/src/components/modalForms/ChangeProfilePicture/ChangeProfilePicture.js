import React, { useContext } from "react";
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";
import { ModalContext } from "context/ModalContext";
import { changeAvatar } from "service";

const validationSchema = Yup.object({
  imageLink: Yup.string().url().required("image link is required"),
});

const fields = {
  imageLink: { initialVal: "", type: "text", label: "avatar image URL" },
};

const ChangeProfilePicture = ({ changeProfilePic }) => {
  const [, modalDispatch] = useContext(ModalContext);

  const handleSubmit = async (submittedData, { setSubmitting }) => {
    const { data } = await changeAvatar({
      payload: { imageURL: submittedData.imageLink },
      setLoading: setSubmitting,
    });
    if (!!data) {
      modalDispatch({ type: "CLOSE" });
      changeProfilePic(submittedData.imageLink);
    }
  };
  return (
    <div className="change-profile-picture-modal">
      <SimpleForm
        submitButtonName="update"
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
        fields={fields}
      />
    </div>
  );
};

export default ChangeProfilePicture;
