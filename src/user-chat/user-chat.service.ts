import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserChat } from "./user-chat.model";
import { UserChatDto } from "./dto/UserChatDto";


@Injectable()
export class UserChatService{
    constructor(@InjectModel(UserChat) private userChatModel: typeof UserChat){}

    async addUserChat(userChatDto:UserChatDto): Promise<void>{
        try{
            await this.userChatModel.create(userChatDto as any);
        }catch(error){
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        }
    }

    async deleteUserChat(userChatID:number): Promise<number>{
        try{
            return await this.userChatModel.destroy({where: {userChatID:userChatID}});
        }catch(error){
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        }
    }

    async removeUserFromChat(username: string , chatID:number): Promise<number>{
        try{
            return await this.userChatModel.destroy({where: {username: username , chatID: chatID}});
        }catch(error){
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        }
    }

    async findAllUserChats(username: string): Promise<UserChat[]>{
        const userChats = await this.userChatModel.findAll({where: {username:username}});
        return userChats;
    }
}