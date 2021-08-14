const ResponseError = require("./ResponseError");

class RequiredFieldError extends ResponseError {
  constructor(...args) {
    super(...args);
  }

  static requiredValues(keys) {
    const details = keys.reduce((acc, key) => ({ ...acc, [`${key}`]: `${key} is required` }), {});
    return new RequiredFieldError(400, details, "Missing required fields");
  }
}

module.exports = RequiredFieldError;
