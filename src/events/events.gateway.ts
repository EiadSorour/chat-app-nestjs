import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { EventsService } from "./events.service";
import { CreateChatDto } from "src/chat/dto/creaetChatDto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/authentication.guard";
import { SendMessageDto } from "./dto/sendMessageDto";


@UseGuards(AuthGuard)
@WebSocketGateway(80 , {namespace: "/chat"})
export class EventsGateway {
    
    constructor(private readonly eventsService: EventsService) {}
    

    @WebSocketServer()
    server: Server

    @SubscribeMessage("createChat")
    async handleCreateChat(@MessageBody() createChatDto: CreateChatDto){
        await this.eventsService.createChat(createChatDto);
    }

    @SubscribeMessage("joinChat")
    async handleJoinChat(@MessageBody("chatID") chatID: any , @ConnectedSocket() client: Socket){
        const username = client.data.payload.username;
        const userChat = {
            username: username,
            chatID:chatID
        }
        await this.eventsService.addUserToChat(userChat);
        client.join(String(chatID));
    }

    @SubscribeMessage("leaveChat")
    async handleLeaveChat(@MessageBody("chatID") chatID: any , @ConnectedSocket() client: Socket){
        const username = client.data.payload.username;
        await this.eventsService.removeUserFromChat(username , chatID);
        client.leave(String(chatID));
    }

    @SubscribeMessage("sendMessage")
    async handleNewMessage(@MessageBody() messageBody:SendMessageDto , @ConnectedSocket() client: Socket){
        client.to(String(messageBody.chatID)).emit("newMessage" , messageBody.message);
    }

    @SubscribeMessage("test")
    async handleTest(@MessageBody() messageBody:SendMessageDto , @ConnectedSocket() client: Socket){
        console.log(client.rooms);
    }

    
}