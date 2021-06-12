import React, { useState } from "react";
import "./Register.scss";
import RegisterStage1 from "./RegisterStage1";
import RegisterStage2 from "./RegisterStage2";

const Register = () => {
	const [registerStage, setRegisterStage] = useState(1);

	const [registerFormField, setRegisterFormFields] = useState({
		username: "",
		password: "",
		matchPassword: "",
		email: "",
		name: "",
		surname: ""
	})

	const handleChangeFieldValues = (newValues) => {
		setRegisterFormFields(fields => ({ ...fields, ...newValues }));
	}

	return (
		<div className="register-form">
			{registerStage === 1 &&
				<RegisterStage1
					changeFieldVals={handleChangeFieldValues}
					initialFieldValues={registerFormField}
					changeStage={setRegisterStage}
				/>}
			{registerStage === 2 &&
				<RegisterStage2
						changeStage={setRegisterStage}
					initialFieldValues={registerFormField}
				/>}
		</div>
	);
};

export default Register;
