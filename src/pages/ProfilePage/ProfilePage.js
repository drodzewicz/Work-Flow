import React from "react";
import "./ProfilePage.scss";
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";
import Avatar from "components/Avatar/Avatar";

const fields = {
  username: {initialVal: "", type: "text"},
  name: {initialVal: "", type: "text"},
  suername: {initialVal: "", type: "text"},
  email: {initialVal: "", type: "text"},
}

const handleSubmit = (data, { setSubmitting }) => {
  setSubmitting(true);
  console.log("updated", data);
  setTimeout(() => {
    setSubmitting(false);
  }, 2000);
}

function ProfilePage() {
  return (
    <div className="profile-page-container">
      <Avatar imageLink="https://graphics-for-less.com/wp-content/uploads/edd/2015/11/woman-avatar-4.png" />
      <SimpleForm 
        submitButtonName="Login"
        // validationSchema={validationSchema}
        handleSubmit={handleSubmit}
        fields={fields}
      />
    </div>
  )
}

export default ProfilePage
