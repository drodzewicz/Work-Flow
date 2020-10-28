const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env || "veri $ecret K#y";

const getUserFromJWT = async (token) => {
    let authorization = token.split(" ")[1];
    let decoded;
    try {
        decoded = jwt.verify(authorization, SECRET_KEY);
        return { ...decoded, verified: true }
    } catch (e) {
        return { verified: false };
    }
}

module.exports = getUserFromJWT;