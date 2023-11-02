import * as Yup from "yup";

const MAX_FILE_SIZE = 102400; //100KB

export const validationSchema = Yup.object({
  image: Yup.mixed()
    .required("Required")
    .test({
      message: "Please provide a supported file type",
      test: (file, context) => {
        const fileName = (file as any)?.name;
        const isValid = ["jpg", "png"].includes(fileName?.split(".").pop() as string);
        if (!isValid) context?.createError();
        return isValid;
      },
    })
    .test({
      message: `File too big, can't exceed ${MAX_FILE_SIZE}`,
      test: (file) => {
        const isValid = (file as any)?.size < MAX_FILE_SIZE;
        return isValid;
      },
    }),
});
