const { PayloadValueError } = require("../error/");

module.exports = requiredValues = (keys, body) => {
  const requiredFields = [];

  keys.forEach((key) => {
    if (!body[`${key}`]) requiredFields.push(key);
  });
  if (requiredFields.length > 0) {
    throw PayloadValueError.requiredValues(requiredFields);
  }
};
