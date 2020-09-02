import React from "react";
import { TextField } from "@material-ui/core";
import "./TextInput.scss";
import PropTypes from "prop-types";

const TextInput = ({ hasErrors, helperText, label, name, type, multiline, onChange, value, classes }) => {
	const getLabel = () => {
		return label.length > 0 ? label : name;
	};

	return (
		<TextField
			onChange={onChange}
			value={value}
			className={`workflow-textfield ${classes.join(" ")}`}
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
	onChange: undefined,
	value: "",
	classes: [],
};

TextInput.propTypes = {
	hasErrors: PropTypes.bool,
	helperText: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	multiline: PropTypes.shape({ rows: PropTypes.number.isRequired, max: PropTypes.number.isRequired }),
	onChange: PropTypes.func,
	value: PropTypes.string,
	classes: PropTypes.arrayOf(PropTypes.string),
};

export default TextInput;
