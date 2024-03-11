import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserChat } from "./user-chat.model";
import { UserChatController } from "./user-chat.controller";
import { UserChatService } from "./user-chat.service";

@Module({
    imports: [SequelizeModule.forFeature([UserChat])],
    controllers: [UserChatController],
    providers: [UserChatService],
    exports: [UserChatService]
})
export class UserChatModule{}