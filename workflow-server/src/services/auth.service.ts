import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import { UserRepository } from "../repositories/user.repository.js";
import { Service, Inject } from "typedi";
import { NotFoundError, UnauthorizedError } from "routing-controllers";
import { UserMapper } from "../mappers/user.mapper.js";
import { UserDTO } from "../types/dto/user.dto.js";

@Service()
export class AuthService {
  @Inject()
  userRepository: UserRepository;

  async register(user: any): Promise<UserDTO> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const newUser = await this.userRepository.createUser(user);
    return UserMapper(newUser);
  }

  async login(credentials: { username: string; password: string }): Promise<UserDTO> {
    const user = await this.userRepository.getUserByUsername(credentials.username);
    if (!user) {
      throw new NotFoundError("User does not exist");
    }
    const isPasswordMatched = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedError("Bad Login");
    }
    return UserMapper(user);
  }

  async logout(token: string): Promise<void> {
    if (!token) {
      throw new UnauthorizedError("No refresh token provided");
    }
    const user = await this.userRepository.getUserByRefreshToken(token);
    if (!user) {
      return;
    }
    const decoded = jwt.verify(token, env.jwt.refreshToken.secret);
    if (!user._id?.equals(decoded.id)) {
      throw new UnauthorizedError("Invalid Refresh token");
    }
    await this.userRepository.updateUser(user._id.toString(), { refreshToken: null });
  }

  async generateAccessJWT(user: any): Promise<string> {
    return jwt.sign({ id: user._id }, env.jwt.accessToken.secret, { expiresIn: env.jwt.accessToken.lifespanSeconds });
  }

  async generateRefreshJWT(user: any): Promise<string> {
    const token = jwt.sign({ id: user._id }, env.jwt.refreshToken.secret, {
      expiresIn: env.jwt.refreshToken.lifespanSeconds,
    });
    await this.userRepository.updateUser(user._id, { refreshToken: token });
    return token;
  }

  async handleRefreshToken(token: string) {
    if (!token) {
      throw new UnauthorizedError("No refresh token provided");
    }
    const user = await this.userRepository.getUserByRefreshToken(token);
    if (!user) {
      throw new UnauthorizedError("Invalid Refresh token 1");
    }
    const decoded = jwt.verify(token, env.jwt.refreshToken.secret);
    if (!user._id.equals(decoded.id)) {
      throw new UnauthorizedError("Invalid Refresh token 2");
    }
    return await this.generateAccessJWT(user);
  }
}
