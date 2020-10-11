const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env || "veri $ecret K#y";

const getUserFromJWT = async (token) => {
    try {
        const res = jwt.decode(token)
        return res;
    } catch (error) {
        return error;
    }
}

module.exports = getUserFromJWT;