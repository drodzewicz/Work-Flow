const processErrors = (err) => {
	const message = {};
	for (const key in err.errors) {
		message[key] = err.errors[key].message;
	}
	return message;
};

module.exports = processErrors;