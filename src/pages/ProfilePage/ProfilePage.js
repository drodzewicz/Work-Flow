import React, {useState, useContext} from "react";
import "./ProfilePage.scss";
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";
import Image from "components/Image/Image";
import Button from "components/Button/Button";
import ImageIcon from '@material-ui/icons/Image';
import { ModalContext } from "context/ModalContext";


const validationSchema = Yup.object({
  username: Yup
    .string()
    .max(25, "username is too long")
    .required("field is required"),
  email: Yup
    .string()
    .email()
    .required("field is required"),
  name: Yup
    .string()
    .max(25, "name is too long")
    .required("field is required"),
  surname: Yup
    .string()
    .max(25, "surname is too long")
    .required("field is required")
});

const ProfilePage = () => {

  const [, modalDispatch] = useContext(ModalContext);

  const [profileInfo, ] = useState({
    username: {initialVal: "DarkoDark", type: "text"},
    name: {initialVal: "darkowski", type: "text"},
    surname: {initialVal: "darek", type: "text"},
    email: {initialVal: "darkowski@daark.com", type: "text"},
  });

  const handleSubmit = (data, { setSubmitting }) => {
    setSubmitting(true);
    console.log("updated", data);
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  }
  
  const changeImageModalOpen = () => {
    modalDispatch({type: "OPEN", payload: { render: "hej", title: "Testing"}})
  }
  

  return (
    <div className="profile-page-container">
      <div className="profile-image">
        <Image imageLink="https://graphics-for-less.com/wp-content/uploads/edd/2015/11/woman-avatar-4.png" />
        <button onClick={changeImageModalOpen} className="change-image-btn">
          <ImageIcon />
        </button>
      </div>
      <div className="profile-info">
        <h1 className="username">
          {`@${profileInfo.username.initialVal}`}
        </h1>
      <h3 className="name-surname">
        {`${profileInfo.name.initialVal} ${profileInfo.surname.initialVal}`}
      </h3>
      </div>
      <SimpleForm 
        submitButtonName="save changes"
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
        fields={profileInfo}
      />
      <Button classes={["change-password"]}>change password</Button>
    </div>
  )
}

export default ProfilePage
