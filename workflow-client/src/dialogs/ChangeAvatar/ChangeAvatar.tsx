import React, { useMemo } from "react";

import { OnSubmitType } from "@/types/utils";

import UploadFile from "@/components/form/UploadFile/UploadFile";
import { Field, Form, FormikProvider, useFormik } from "formik";

import { useUpdateUserAvatar } from "@/service/self";
import { convertToBase64 } from "@/service/utils/base64";

import Image from "@/components/general/Image";

import "./ChangeAvatar.scss";

import { validationSchema } from "./formSchema";

export type ChangeAvatarType = { image: File | null };

type ChangeAvatarProps = {
  onSuccess?: () => void;
};

const ChangeAvatar: React.FC<ChangeAvatarProps> = ({ onSuccess }) => {
  const { mutate: updateUserAvatar } = useUpdateUserAvatar({ onSuccess });

  const onSubmit: OnSubmitType<ChangeAvatarType> = async (values) => {
    if (values.image) {
      const encodedImage = await convertToBase64(values.image);
      updateUserAvatar(encodedImage as string);
    }
  };

  const formik = useFormik<ChangeAvatarType>({
    initialValues: { image: null },
    validationSchema,
    onSubmit,
  });

  const imagePreview = useMemo(
    () => (formik.values.image ? URL.createObjectURL(formik.values.image) : undefined),
    [formik.values.image]
  );

  return (
    <div className="change-avatar-dialog">
      <Image src={imagePreview} className="change-avatar-dialog__avatar" />

      <FormikProvider value={formik}>
        <Form className="board-editor">
          <Field name="image" as={UploadFile} />
          <button className="btn btn--glow" type="submit">
            Submit
          </button>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default ChangeAvatar;
