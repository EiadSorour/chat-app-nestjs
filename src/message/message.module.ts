import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Message } from "./message.model";

@Module({
    imports: [SequelizeModule.forFeature([Message])],
    controllers: [],
    providers: [],
    exports: []
})
export class MessageModule{}