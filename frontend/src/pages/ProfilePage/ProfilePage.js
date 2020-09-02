import React, { useState, useContext } from "react";
import * as Yup from "yup";
import "./ProfilePage.scss";
import ImageIcon from "@material-ui/icons/Image";
import SimpleForm from "components/SimpleForm/SimpleForm";
import Image from "components/Image/Image";
import Button from "components/Button/Button";
import ContainerBox from "components/ContainerBox/ContainerBox";
import { ModalContext } from "context/ModalContext";
import { ChangePassword, ChangeProfilePicture } from "modalForms";

const validationSchema = Yup.object({
	username: Yup.string().max(25, "username is too long").required("field is required"),
	email: Yup.string().email().required("field is required"),
	name: Yup.string().max(25, "name is too long").required("field is required"),
	surname: Yup.string().max(25, "surname is too long").required("field is required"),
});

const ProfilePage = () => {
	const [, modalDispatch] = useContext(ModalContext);

	const [profileInfo] = useState({
		username: { initialVal: "DarkoDark", type: "text" },
		name: { initialVal: "darkowski", type: "text" },
		surname: { initialVal: "darek", type: "text" },
		email: { initialVal: "darkowski@daark.com", type: "text" },
	});
	const [profilePicture, setProfilePicture] = useState("");

	const handleSaveChanges = (data, { setSubmitting }) => {
		setSubmitting(true);
		console.log("updated", data);
		setTimeout(() => {
			setSubmitting(false);
		}, 2000);
	};

	const handleChangeProfilePicture = (newImageURL) => {
		setProfilePicture(newImageURL);
	};

	const changeImageModalOpen = () => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: <ChangeProfilePicture changeProfilePic={handleChangeProfilePicture} />,
				title: "Change profile picture",
			},
		});
	};
	const changePasswordModalOpen = () => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: <ChangePassword />,
				title: "Change password",
			},
		});
	};

	return (
		<ContainerBox classes={[""]}>
			<div className="profile-page-container">
				<div className="profile-image">
					<Image imageURL={profilePicture} />
					<button onClick={changeImageModalOpen} className="change-image-btn">
						<ImageIcon />
					</button>
				</div>
				<div className="profile-info">
					<h1 className="username">{`@${profileInfo.username.initialVal}`}</h1>
					<h3 className="name-surname">{`${profileInfo.name.initialVal} ${profileInfo.surname.initialVal}`}</h3>
				</div>
				<SimpleForm
					submitButtonName="save changes"
					validationSchema={validationSchema}
					handleSubmit={handleSaveChanges}
					fields={profileInfo}
				/>
				<Button clicked={changePasswordModalOpen} classes={["change-password"]}>
					change password
				</Button>
			</div>
		</ContainerBox>
	);
};

export default ProfilePage;
