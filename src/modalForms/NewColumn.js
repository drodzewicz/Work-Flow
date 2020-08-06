import React from "react";
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";

const validationSchema = Yup.object({
  name: Yup.string()
    .max(25, "username is too long")
    .required("field is required"),
  order: Yup.number().required("field is required"),
});

const fields = {
  name: { initialVal: "", type: "text" },
  order: { initialVal: "", type: "number" },
};

const handleSubmit = (data, { setSubmitting }) => {
  setSubmitting(true);
  console.log("submited", data);
  setTimeout(() => {
    setSubmitting(false);
  }, 2000);
};

const NewColumn = () => {
  return (
    <SimpleForm
      submitButtonName="Create"
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
      fields={fields}
    />
  );
};

export default NewColumn;
