import { JsonController, Body, Post, Res } from "routing-controllers";
import { AuthService } from "../services/auth.service.js";
import { Container } from "typedi";

class UserRegisterPayload {
  username: string;
  email: string;
  password: string;
  matchingPassword: string;
  name: string;
  surname: string;
}

class LoginCredentialsPayload {
  username: string;
  password: string;
}


@JsonController("/auth")
export class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = Container.get(AuthService);
  }

  @Post("/register")
  register(@Body() user: UserRegisterPayload) {
    return this.authService.register(user);
  }

  @Post("/login")
  async login(@Body() credentials: LoginCredentialsPayload, @Res() response) {
    const { user, refreshToken, accessToken } = await this.authService.login(credentials);
    
    return response
    .cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } )
    .json({ message: "loged in successfully", user, accessToken });
  }
}
