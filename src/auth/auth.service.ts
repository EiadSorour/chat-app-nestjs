import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { UserDto } from "./dto/userDto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService{
    constructor(private userService:UserService , private jwtService:JwtService){}

    async login(userDto:UserDto): Promise<string>{
        try{
            const user = await this.userService.findUser(userDto.username);
            if(!user){
                throw new UnauthorizedException("User is not registered");
            }
            
            const correctPassword = await bcrypt.compare(userDto.password , user.password);
            if(!correctPassword){
                throw new UnauthorizedException("Incorrect password");
            }

            const payload = {username: userDto.username}
            return await this.jwtService.signAsync(payload)
        }catch(error){
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        }
    }

    async register(userDto:UserDto): Promise<string>{
        try{
            userDto.password = await bcrypt.hash(userDto.password , 10);
            await this.userService.createUser(userDto);
            const payload = {username: userDto.username}
            return await this.jwtService.signAsync(payload)
        }catch(error){
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        }
    }
}