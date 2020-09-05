const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { SECRET_KEY } = process.env || "veri $ecret K#y";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
        User.findById(jwtPayload.id, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, { id: user._id, username: user.username });
            } else {
                return done(null, false);
            }
        });
    }));
};