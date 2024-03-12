import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { HttpStatusMessage } from "src/utils/HttpStatusMessage";
import { CreateChatDto } from "./dto/createChatDto";


@Controller("/api/chat")
export class ChatController{
    constructor(private readonly chatService:ChatService){}

    @Post()
    @HttpCode(HttpStatus.OK)
    async createChat(@Body() createChatDto:CreateChatDto){
        await this.chatService.createChat(createChatDto);
        return {status: HttpStatusMessage.SUCCESS , data: {message: "Chat created successfully"}}
    }

    @Delete("/:chatID")
    @HttpCode(HttpStatus.OK)
    async deleteChat(@Param("chatID") chatID:number){
        
        const deletedChats = await this.chatService.deleteChat(chatID);
        if(deletedChats == 0){
            return {status: HttpStatusMessage.FAIL , data: {message: "Chat doesn't exist"}}
        }

        return {status: HttpStatusMessage.SUCCESS , data: {message: "Chat deleted successfully"}}
    }
    
}