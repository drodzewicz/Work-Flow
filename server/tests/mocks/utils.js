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

utils.deepCopy = function (item) {
  return JSON.parse(JSON.stringify(item))
}
module.exports = utils;
