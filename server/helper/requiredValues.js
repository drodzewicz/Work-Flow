const { RequiredFieldError } = require("../error/");

module.exports = requiredValues = (keys, payload) => {
  const requiredFields = [];

  keys.forEach((key) => {
    if (!payload[`${key}`]) requiredFields.push(key);
  });
  if (requiredFields.length > 0) {
    throw RequiredFieldError.requiredValues(requiredFields);
  }
};
