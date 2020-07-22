import React, {useState} from "react";
import "./ProfilePage.scss";
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";
import Image from "components/Image/Image";
import ImageIcon from '@material-ui/icons/Image';

const handleSubmit = (data, { setSubmitting }) => {
  setSubmitting(true);
  console.log("updated", data);
  setTimeout(() => {
    setSubmitting(false);
  }, 2000);
}

const chnageImageModalOpen = () => {
  console.log("chaning image");
}

const ProfilePage = () => {
  const [profileInfo, ] = useState({
    username: {initialVal: "", type: "text"},
    name: {initialVal: "", type: "text"},
    suername: {initialVal: "", type: "text"},
    email: {initialVal: "", type: "text"},
  });

  return (
    <div className="profile-page-container">
      <div className="profile-image">
      <Image imageLink="https://graphics-for-less.com/wp-content/uploads/edd/2015/11/woman-avatar-4.png" />
      <button onClick={chnageImageModalOpen} className="change-image-btn">
        <ImageIcon />
      </button>
      </div>
      <SimpleForm 
        submitButtonName="save changes"
        // validationSchema={validationSchema}
        handleSubmit={handleSubmit}
        fields={profileInfo}
      />
    </div>
  )
}

export default ProfilePage
