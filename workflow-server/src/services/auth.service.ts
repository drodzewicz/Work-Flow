import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import { UserRepository } from "../repositories/user.repository.js";
import { Service, Inject } from "typedi";
import { HttpError, NotFoundError, UnauthorizedError } from "routing-controllers";

@Service()
export class AuthService {
  @Inject()
  userRepository: UserRepository;

  async register(user: any) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const newUser = await this.userRepository.createUser(user);

    return {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
    };
  }

  async login(credentials: { username: string; password: string }) {
    const user = await this.userRepository.getUserByUsername(credentials.username, { fields: "_id username password" });
    if (!user) {
      throw new NotFoundError("User does not exist");
    }
    const isPasswordMatched = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedError("Bad Login");
    }
    const accessToken = jwt.sign({ id: user._id }, env.jwt.accessTokenSecret, { expiresIn: '2min' });
    const refreshToken = jwt.sign({ id: user._id }, env.jwt.refreshTokenSecret, { expiresIn: '1d' });
    
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    return { user, refreshToken, accessToken };
  }
}
