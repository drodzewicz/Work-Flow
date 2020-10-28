const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env || "veri $ecret K#y";

const userMiddleWare = {};

userMiddleWare.getUserFromToken = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.split(" ")[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, SECRET_KEY);
            console.log("SUCCESS ======: ", decoded);

        } catch (e) {
            console.log("ERROR ======: ", e);
        }
    }
    return next();
}

module.exports = userMiddleWare;