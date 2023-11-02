import React from "react";

import { useField } from "formik";

import "./UploadFile.scss";

type UploadFileProps = {
  name: string;
};

const UploadFile: React.FC<UploadFileProps> = ({ name }) => {
  const [_field, { error }, { setValue, setTouched }] = useField<File>(name);

  const onUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    if (e.target.files) {
      setValue(e.target.files[0]);
    }
  };

  return (
    <div className="upload-file">
      <input type="file" name="image" accept="image/*" onChange={onUploadChange} />
      {error && <span id="error">{error}</span>}
    </div>
  );
};

export default UploadFile;
