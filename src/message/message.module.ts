import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Message } from "./message.model";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";

@Module({
    imports: [SequelizeModule.forFeature([Message])],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService]
})
export class MessageModule{}