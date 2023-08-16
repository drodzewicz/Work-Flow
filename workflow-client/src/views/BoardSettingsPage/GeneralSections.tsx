import React from "react";

import Button from "@/components/form/Button";
import { TextAreaField, TextField } from "@/components/form/TextInput";
import { Form, Field, FormikProvider, useFormik } from "formik";
import { useParams } from "react-router-dom";

import useGetBoard from "@/service/useGetBoard";
import useUpdateBoardInfo from "@/service/useUpdateBoardInfo";

import { validationSchema } from "@/dialogs/BoardEditor/formSchema";

const GeneralSections: React.FC = () => {
  const params = useParams<{ id: string }>();

  const { mutate: updateBoard } = useUpdateBoardInfo({ boardId: params.id ?? "" });
  const { data = { name: "", description: "" } } = useGetBoard({ boardId: params.id });

  const onSubmitHandler = (values: any) => {
    console.log("kek");
    updateBoard(values);
  };

  const formik = useFormik({
    initialValues: { name: data.name, description: data.description },
    validationSchema: validationSchema,
    onSubmit: onSubmitHandler,
    enableReinitialize: true,
  });

  return (
    <section className="">
      <h2 className="text-lg font-bold mb-3">General</h2>
      <hr />
      <FormikProvider value={formik}>
        <Form className="flex flex-col">
          <Field
            name="name"
            autoFocus={true}
            error={formik.touched.name && formik.errors?.name}
            as={TextField}
          />
          <Field
            name="description"
            error={formik.touched.description && formik.errors?.description}
            as={TextAreaField}
          />
          <Button disabled={formik.isValid} type="submit" className="self-end" variant="glow">
            save changes
          </Button>
        </Form>
      </FormikProvider>
    </section>
  );
};

export default GeneralSections;
