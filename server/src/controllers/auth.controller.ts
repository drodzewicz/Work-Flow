import { Response } from "express";
import { Container } from "typedi";
import { JsonController, Body, Post, Get, Res, CookieParam } from "routing-controllers";
import { AuthService } from "../services/index.js";
import { env } from "../config/env.config.js";
import { loginPayloadValidator, registerPayloadValidator } from "../validators/auth.validator.js";
import { fieldErrorsHandler } from "../utils/payloadValidation.utils.js";
import { LoginPayload, RegisterPayload } from "../types/request/auth.type.js";

@JsonController("/auth")
export class AuthController {
    authService: AuthService;

    constructor() {
        this.authService = Container.get(AuthService);
    }

    @Post("/register")
    register(@Body() user: RegisterPayload) {
        fieldErrorsHandler(registerPayloadValidator(user));

        return this.authService.register(user);
    }

    @Post("/login")
    async login(@Body() credentials: LoginPayload, @Res() response: Response) {
        fieldErrorsHandler(loginPayloadValidator(credentials));

        const user = await this.authService.login(credentials);
        const refreshToken = await this.authService.generateRefreshJWT(user);
        const accessToken = await this.authService.generateAccessJWT(user);

        return response
            .cookie("jwt", refreshToken, {
                httpOnly: true,
                maxAge: env.jwt.refreshToken.lifespanSeconds * 1000,
            })
            .json({ user, accessToken });
    }

    @Post("/logout")
    async logout(@CookieParam("jwt") token: string, @Res() response: Response) {
        await this.authService.logout(token);
        return response
            .clearCookie("jwt", { httpOnly: true })
            .json({ message: "successfully logged out" });
    }

    @Get("/refreshToken")
    async refreshToken(@CookieParam("jwt") token: string) {
        const accessToken = await this.authService.handleRefreshToken(token);
        return { accessToken };
    }
}
