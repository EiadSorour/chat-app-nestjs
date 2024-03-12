import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AddMessageDto } from "./dto/addMessageDto";
import { MessageService } from "./message.service";
import { HttpStatusMessage } from "src/utils/HttpStatusMessage";


@Controller("/api/message")
export class MessageController{
    constructor(private readonly messageService:MessageService){}
    
    @Post()
    @HttpCode(HttpStatus.OK)
    async addMessage(@Body() addMessageDto: AddMessageDto){
        await this.messageService.addMessage(addMessageDto);
        return {status: HttpStatusMessage.SUCCESS , data: {message: "Message is saved successfully"}}
    }
}