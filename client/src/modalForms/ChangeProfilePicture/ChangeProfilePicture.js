import React, { useContext } from "react";
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";
import { ModalContext } from "context/ModalContext";
import { useCallFetchData } from "Hooks/useFetch";

const validationSchema = Yup.object({
	imageLink: Yup.string().url().required("image link is required"),
});

const fields = {
	imageLink: { initialVal: "", type: "text" },
};

const ChangeProfilePicture = ({ changeProfilePic }) => {
	const [, modalDispatch] = useContext(ModalContext);

	const [, changeImageCallAPI] = useCallFetchData({
		url: "/user/change_avatar",
		method: "PATCH",
		token: true,
	});

	const handleSubmit = async (data, { setSubmitting }) => {
		setSubmitting(true);
		try {
			await changeImageCallAPI({ imageURL: data.imageLink });
			changeProfilePic(data.imageLink);
			modalDispatch({ type: "CLOSE" });
		} catch (error) {
			setSubmitting(false);
		}
	};
	return (
		<div className="change-profile-picture-modal">
			<SimpleForm
				submitButtonName="update"
				validationSchema={validationSchema}
				handleSubmit={handleSubmit}
				fields={fields}
			/>
		</div>
	);
};

export default ChangeProfilePicture;
