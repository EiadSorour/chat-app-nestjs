import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Chat } from "./chat.model";
import { CreateChatDto } from "./dto/createChatDto";


@Injectable()
export class ChatService{
    constructor(@InjectModel(Chat) private chatModel:typeof Chat){}
    
    async createChat(createChatDto:CreateChatDto): Promise<void>{
        try{
            await this.chatModel.create(createChatDto as any);
        }catch(error){
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        }
    }

    async deleteChat(chatID:number): Promise<number>{
        try{
            return await this.chatModel.destroy({where: {chatID:chatID}});
        }catch(error){
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        }
    }
}