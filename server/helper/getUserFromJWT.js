const jwt = require("jsonwebtoken");
const ENV_CONF = require("../configs/env.conf");

const getUserFromJWT = async (token) => {
    let authorization = token.split(" ")[1];
    let decoded;
    try {
        decoded = jwt.verify(authorization, ENV_CONF.SECRET_KEY);
        return { ...decoded, verified: true }
    } catch (e) {
        return { verified: false };
    }
}

module.exports = getUserFromJWT;