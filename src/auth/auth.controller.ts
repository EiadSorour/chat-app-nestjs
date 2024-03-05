import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserRegisterDto } from "./dto/userRegister.dto";
import { HttpStatusMessage } from "src/utils/HttpStatusMessage";
import { UserLoginDto } from "./dto/userLogin.dto";

@Controller("/api/user")
export class AuthController{

    constructor(private readonly authService:AuthService){} 
    
    @Post("/register")
    @HttpCode(201)
    async register(@Body() userRegisterDto:UserRegisterDto){
        const token = await this.authService.register(userRegisterDto);
        return {status: HttpStatusMessage.SUCCESS , data: {token:token}}
    }

    @Post("/login")
    @HttpCode(200)
    async login( @Body() userLoginDto:UserLoginDto ){
        const token = await this.authService.login(userLoginDto);
        return {status: HttpStatusMessage.SUCCESS , data: {token:token}}
    }
}