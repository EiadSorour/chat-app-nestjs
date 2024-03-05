import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserChat } from "./user-chat.model";

@Module({
    imports: [SequelizeModule.forFeature([UserChat])],
    controllers: [],
    providers: [],
    exports: []
})
export class UserChatModule{}