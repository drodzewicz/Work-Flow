require("dotenv").config();
const ENV_CONF = require("./configs/env.conf");
const app = require("./app");

app.listen(ENV_CONF.PORT, () => {
  console.log(`server running on PORT: [${ENV_CONF.PORT}] in [${ENV_CONF.NODE_ENV}]`);
});
