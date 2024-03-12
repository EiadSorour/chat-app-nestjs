import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Message } from "./message.model";
import { AddMessageDto } from "./dto/addMessageDto";


@Injectable()
export class MessageService{
    constructor(@InjectModel(Message) private messageModel: typeof Message){}
    
    async addMessage(addMessageDto: AddMessageDto): Promise<void>{
        try{
            await this.messageModel.create(addMessageDto as any);
        }catch(error){
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        }
    }
}