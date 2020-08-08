import React, { useContext } from "react";
import * as Yup from "yup";
import SimpleForm from "components/SimpleForm/SimpleForm";
import { ModalContext } from "context/ModalContext";

const validationSchema = Yup.object({
	imageLink: Yup.string().url(),
});

const fields = {
	imageLink: { initialVal: "", type: "text" },
};

const ChangeProfilePicture = ({ changeProfilePic }) => {
	const [, modalDispatch] = useContext(ModalContext);

	const handleSubmit = (data, { setSubmitting }) => {
		setSubmitting(true);
		setTimeout(() => {
			changeProfilePic(data.imageLink);
			setSubmitting(false);
			modalDispatch({ type: "CLOSE" });
		}, 2000);
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
