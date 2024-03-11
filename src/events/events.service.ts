import { Injectable } from "@nestjs/common";
import { ChatService } from "src/chat/chat.service";
import { CreateChatDto } from "src/chat/dto/creaetChatDto";
import { UserChatDto } from "src/user-chat/dto/UserChatDto";
import { UserChatService } from "src/user-chat/user-chat.service";

@Injectable()
export class EventsService{
    
    constructor(private readonly chatService:ChatService , private userChatService:UserChatService){}

    async createChat(createChatDto: CreateChatDto){
        await this.chatService.createChat(createChatDto);
    }

    async addUserToChat(userChatDto: UserChatDto){
        await this.userChatService.addUserChat(userChatDto);
    }

    async removeUserFromChat(username: string , chatID: number){
        await this.userChatService.removeUserFromChat(username , chatID);
    }
}