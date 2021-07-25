import * as Yup from "yup";

export { default } from "./ChangeProfilePicture";

export const validationSchema = Yup.object({
  imageLink: Yup.string().url().required("image link is required"),
});

export interface ChangeProfilePictureProps {
  changeProfilePic: (newImage: string) => void;
}

export interface FormValues {
  imageLink: string;
}
