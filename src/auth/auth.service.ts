import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserLoginDto } from "./dto/userLogin.dto";
import { UserRegisterDto } from "./dto/userRegister.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService{
    constructor(private userService:UserService , private jwtService:JwtService){}

    async login(userLoginDto: UserLoginDto){
        const user = await this.userService.findUser(userLoginDto.username);
        if(!user){
            throw new UnauthorizedException("User is not registered");
        }
        
        const correctPassword = await bcrypt.compare(userLoginDto.password , user.password);
        if(!correctPassword){
            throw new UnauthorizedException("Incorrect password");
        }

        const payload = {username: userLoginDto.username}
        return await this.jwtService.signAsync(payload)
    }

    async register(userRegisterDto: UserRegisterDto){
        userRegisterDto.password = await bcrypt.hash(userRegisterDto.password , 10);
        await this.userService.createUser(userRegisterDto);
        const payload = {username: userRegisterDto.username}
        return await this.jwtService.signAsync(payload)
    }
}