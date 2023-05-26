import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "./env.config.js";
import { UserRepository } from "../repositories/user.repository.js";

export const usePassportJWT = () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt.accessTokenSecret,
  };

  const userRepository = new UserRepository();

  passport.use(
    new Strategy(options, async function (jwtPayload, done) {
      try {
        const user = await userRepository.getUserById(jwtPayload.id);
        if (user) {
          return done(null, { id: user._id, username: user.username });
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }),
  );
};
