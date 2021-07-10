const ResponseError = require("./ResponseError");

class PayloadValueError extends ResponseError {
  constructor(message, status) {
    super(message, status);
  }

  static requiredValues(keys) {
    const message = keys.reduce((acc, key) => ({ ...acc, [`${key}`]: `${key} is required` }), {});
    return new PayloadValueError(message, 400);
  }
}

module.exports = PayloadValueError;
