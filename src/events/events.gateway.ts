import { UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { AuthGuard } from "src/guards/authentication.guard";


@WebSocketGateway(80 , {namespace: "/chat"})
@UseGuards(AuthGuard)
export class EventsGateway {

    @WebSocketServer()
    server: Server

    @SubscribeMessage("newMessage")
    handleEvent(@MessageBody() body: string , @ConnectedSocket() client: Socket ){
        console.log("i am here");
    } 

}