import { Controller, Delete, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { HttpStatusMessage } from "src/utils/HttpStatusMessage";


@Controller("api/user")
export class UserController{
    constructor(private readonly userService:UserService){}

    @Get("/:username")
    @HttpCode(HttpStatus.OK)
    async findUser(@Param("username") username: string){

        const user:User = await this.userService.findUser(username);
        if(!user){
            return {status: HttpStatusMessage.FAIL , data: {message: "User dosn't exist"}}
        }

        return {status: HttpStatusMessage.SUCCESS , data: {user}}
    }

    @Delete("/:username")
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param("username") username:string){
        const deletedUsers = await this.userService.deleteUser(username);
        if(deletedUsers == 0){
            return {status: HttpStatusMessage.FAIL , data: {message: "User dosn't exist"}}
        }

        return {status: HttpStatusMessage.SUCCESS , data: {message: "User deleted successfully"}}
    }
}