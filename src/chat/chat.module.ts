import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Chat } from "./chat.model";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";

@Module({
    imports: [SequelizeModule.forFeature([Chat])],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService]
})
export class ChatModule{}