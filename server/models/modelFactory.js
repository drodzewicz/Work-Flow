const connection = require("../configs/mongoose")

module.exports = (modelName, schema) => {
  return connection.model(modelName, schema);
};
