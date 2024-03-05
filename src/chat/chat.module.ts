import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Chat } from "./chat.model";

@Module({
    imports: [SequelizeModule.forFeature([Chat])],
    controllers: [],
    providers: [],
    exports: []
})
export class ChatModule{}