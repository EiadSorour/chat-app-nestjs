import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { ChatService } from "src/chat/chat.service";
import { CreateChatDto } from "src/chat/dto/creaetChatDto";
import { AddMessageDto } from "src/message/dto/addMessageDto";
import { MessageService } from "src/message/message.service";
import { UserChatDto } from "src/user-chat/dto/UserChatDto";
import { UserChatService } from "src/user-chat/user-chat.service";

@Injectable()
export class EventsService {

    constructor(private readonly chatService: ChatService,
        private readonly userChatService: UserChatService,
        private readonly messageService:MessageService,
        private readonly jwtService: JwtService) { }

    async createChat(createChatDto: CreateChatDto) {
        await this.chatService.createChat(createChatDto);
    }

    async addUserToChat(userChatDto: UserChatDto) {
        await this.userChatService.addUserChat(userChatDto);
    }

    async removeUserFromChat(username: string, chatID: number) {
        await this.userChatService.removeUserFromChat(username, chatID);
    }

    async getUserToChats(username:string){
        const userChats = await this.userChatService.findAllUserChats(username);
        const chats: string[] = [];
        userChats.forEach(userChat => {
            chats.push(String(userChat.dataValues.chatID));
        });
        return chats;
    }

    async saveMessage(addMessageDto:AddMessageDto){
        await this.messageService.addMessage(addMessageDto);
    }

    verifyUser(token: string){
        try {
            const payload = this.jwtService.verify(token);
            return payload;
        } catch (error) {
            throw new WsException("Unauthorized user");
        }
    }
}