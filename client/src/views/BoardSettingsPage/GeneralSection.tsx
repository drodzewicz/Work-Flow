import React from "react";

import { TextAreaField, TextField } from "@/components/form/TextInput";
import { Form, Field, FormikProvider, useFormik } from "formik";

import useBoardId from "@/hooks/useBoardId";
import useRBAC from "@/hooks/useRBAC";

import { useGetBoard, useUpdateBoardInfo } from "@/service/board";

import { validationSchema } from "@/dialogs/BoardEditor/formSchema";

const GeneralSection: React.FC = () => {
    const boardId = useBoardId();

    const { mutate: updateBoard } = useUpdateBoardInfo({ boardId: boardId });
    const { data = { name: "", description: "" } } = useGetBoard({ boardId });

    const { hasAccess: canUpdateBoard } = useRBAC({ boardId, action: "BOARD_UPDATE" });

    const formik = useFormik({
        initialValues: { name: data.name, description: data.description },
        validationSchema: validationSchema,
        onSubmit: (values) => updateBoard(values),
        enableReinitialize: true,
    });

    return (
        <section className="board-settings-page__section__general">
            <FormikProvider value={formik}>
                <Form>
                    <Field
                        name="name"
                        autoFocus={true}
                        error={formik.touched.name && formik.errors?.name}
                        disabled={!canUpdateBoard}
                        as={TextField}
                    />
                    <Field
                        name="description"
                        error={formik.touched.description && formik.errors?.description}
                        disabled={!canUpdateBoard}
                        rows={7}
                        as={TextAreaField}
                    />
                    {canUpdateBoard && (
                        <button
                            disabled={!(formik.isValid && formik.dirty)}
                            type="submit"
                            className="btn btn--glow"
                        >
                            save changes
                        </button>
                    )}
                </Form>
            </FormikProvider>
        </section>
    );
};

export default GeneralSection;
