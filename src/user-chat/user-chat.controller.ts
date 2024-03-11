import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { UserChatService } from "./user-chat.service";
import { HttpStatusMessage } from "src/utils/HttpStatusMessage";
import { UserChatDto } from "./dto/UserChatDto";


@Controller("/api/userChat")
export class UserChatController{
    
    constructor(private readonly userChatService:UserChatService){}

    @Post()
    @HttpCode(HttpStatus.OK)
    async createUserChat(@Body() userChatDto:UserChatDto){
        await this.userChatService.addUserChat(userChatDto);
        return {status: HttpStatusMessage.SUCCESS , data: {message: "Created successfully"}}
    }

    @Delete("/:userChatID")
    @HttpCode(HttpStatus.OK)
    async deleteUserChat(@Param("userChatID") userChatID:number){
        const deletedUserChats = await this.userChatService.deleteUserChat(userChatID);
        if(deletedUserChats == 0){
            return {status: HttpStatusMessage.SUCCESS , data: {message: "User is not a member in this chat"}}
        }

        return {status: HttpStatusMessage.SUCCESS , data: {message: "Deleted successfully"}}
    }

}