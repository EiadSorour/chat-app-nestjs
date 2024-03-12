import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { EventsService } from "./events.service";
import { CreateChatDto } from "src/chat/dto/creaetChatDto";
import { UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "src/guards/authentication.guard";
import { SendMessageDto } from "./dto/sendMessageDto";


@UseGuards(AuthGuard)
@WebSocketGateway(80 , {namespace: "/chat"})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    
    constructor(private readonly eventsService: EventsService) {}
    

    @WebSocketServer()
    server: Server

    afterInit(server:Server){}

    async handleConnection(client:Socket) {
        const token = client.handshake.headers.authorization.split(" ")[1];
        const payload = this.eventsService.verifyUser(token);
        const username = payload.username;
        const chats = await this.eventsService.getUserToChats(username);
        await client.join(chats);
        console.log(`Rooms of ${username}:`);
        console.log(client.rooms);
    }

    handleDisconnect(client:Socket) {}

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
        await client.join(String(chatID));
    }

    @SubscribeMessage("leaveChat")
    async handleLeaveChat(@MessageBody("chatID") chatID: any , @ConnectedSocket() client: Socket){
        const username = client.data.payload.username;
        await this.eventsService.removeUserFromChat(username , chatID);
        client.leave(String(chatID));
    }

    @SubscribeMessage("sendMessage")
    async handleNewMessage(@MessageBody() messageBody:SendMessageDto , @ConnectedSocket() client: Socket){
        const chatID = String(messageBody.chatID);
        const messageText = messageBody.message;
        const username = client.data.payload.username;
        const message = {
            senderUsername: username,
            text: messageText,
            chatID: chatID
        }
        await this.eventsService.saveMessage(message as any);
        client.to(chatID).emit("newMessage" , messageText);
    }

    @SubscribeMessage("test")
    async handleTest(@MessageBody() messageBody: any , @ConnectedSocket() client: Socket){
        client.to(String(messageBody.chatID)).emit("newMessage", messageBody.message);
    }
}