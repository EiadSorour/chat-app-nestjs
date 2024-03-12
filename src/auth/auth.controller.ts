import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { HttpStatusMessage } from "src/utils/HttpStatusMessage";
import { UserDto } from "./dto/userDto";

@Controller("/api/user")
export class AuthController{

    constructor(private readonly authService:AuthService){} 
    
    @Post("/register")
    @HttpCode(201)
    async register(@Body() userDto:UserDto){
        const token = await this.authService.register(userDto);
        return {status: HttpStatusMessage.SUCCESS , data: {token:token}}
    }

    @Post("/login")
    @HttpCode(200)
    async login( @Body() userDto:UserDto ){
        const token = await this.authService.login(userDto);
        return {status: HttpStatusMessage.SUCCESS , data: {token:token}}
    }
}