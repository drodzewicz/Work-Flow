import React from "react";
import { TextField } from "@material-ui/core";
import "./TextInput.scss";
import PropTypes from "prop-types";

const TextInput = ({ hasErrors, helperText, label, name, type, multiline, onChange, value }) => {
	const getLabel = () => {
		return label.length > 0 ? label : name;
	};

	return (
		<TextField
			onChange={onChange}
			value={value}
			className="workflow-textfield"
			error={hasErrors}
			helperText={helperText}
			label={getLabel()}
			name={name}
			type={type}
			variant={"standard"}
			multiline={!!multiline}
			rows={multiline.rows}
			rowsMax={multiline.max}
			margin="dense"
		/>
	);
};

TextInput.defaultProps = {
	hasErrors: false,
	helperText: "",
	label: "",
	type: "text",
	multiline: { rows: 1, max: 1 },
};

TextInput.propTypes = {
	hasErrors: PropTypes.bool,
	helperText: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	multiline: PropTypes.shape({ rows: PropTypes.number.isRequired, max: PropTypes.number.isRequired }),
};

export default TextInput;
