import { Module } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";
import { EventsService } from "./events.service";
import { ChatModule } from "src/chat/chat.module";
import { UserChatModule } from "src/user-chat/user-chat.module";


@Module({
    imports: [ChatModule, UserChatModule],
    controllers: [],
    providers: [EventsGateway, EventsService],
    exports: []
})
export class EventsModule{}