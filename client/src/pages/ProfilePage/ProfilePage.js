import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";
import "./ProfilePage.scss";
import ImageIcon from "@material-ui/icons/Image";
import SimpleForm from "components/SimpleForm/SimpleForm";
import Image from "components/Image/Image";
import Button from "components/Button/Button";
import ContainerBox from "components/ContainerBox/ContainerBox";
import { ModalContext } from "context/ModalContext";
import { UserContext } from "context/UserContext";
import { ChangePassword, ChangeProfilePicture } from "modalForms";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";
import { useCallFetchData } from "Hooks/useFetch";

const validationSchema = Yup.object({
	username: Yup.string().max(25, "username is too long").required("field is required"),
	email: Yup.string().email().required("field is required"),
	name: Yup.string().max(25, "name is too long").required("field is required"),
	surname: Yup.string().max(25, "surname is too long").required("field is required"),
});

const ProfilePage = () => {
	const [, modalDispatch] = useContext(ModalContext);
	const [{ user }] = useContext(UserContext);
	const [, changeCredentialsCallAPI] = useCallFetchData({
		url: "/user/update_credentials",
		method: "POST",
		token: true,
	});

	// const { username } = user;
	const [profileInfo, setProfileInfo] = useState({
		username: { initialVal: "", type: "text" },
		name: { initialVal: "", type: "text" },
		surname: { initialVal: "", type: "text" },
		email: { initialVal: "", type: "text" },
	});
	const [profilePicture, setProfilePicture] = useState("");
	const [profileLoaded, setProfileLoaded] = useState(false);

	useEffect(() => {
		if (!!user) {
			const { username, email, name, surname, avatarImageURL } = user;
			setProfilePicture(avatarImageURL);
			setProfileInfo({
				username: { initialVal: username, type: "text" },
				name: { initialVal: name, type: "text" },
				surname: { initialVal: surname, type: "text" },
				email: { initialVal: email, type: "text" },
			});
			setProfileLoaded(true);
		}
		return () => {};
	}, [user]);

	const handleSaveChanges = async (submittedData, { setSubmitting, setErrors }) => {
		setSubmitting(true);
		const { error} = await changeCredentialsCallAPI(submittedData);
		if (!!error) {
			setErrors(error.data.message)
		} 
		setSubmitting(false);
	};
	const changeImageModalOpen = () => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: <ChangeProfilePicture changeProfilePic={setProfilePicture} />,
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
			{profileLoaded ? (
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
			) : (
				<LoadingOverlay classes={["profile-page-loading-overlay"]} show={true} opacity={0} />
			)}
		</ContainerBox>
	);
};

export default ProfilePage;
