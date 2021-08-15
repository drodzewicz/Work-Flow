const utils = {};

utils.mongoObject = function (obj) {
  function toObject() {
    return obj;
  }
  return {
    ...obj,
    toObject,
  };
};

module.exports = utils;
