import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { UserDto } from "src/auth/dto/userDto";


@Injectable()
export class UserService{

    constructor(@InjectModel(User) private userModel: typeof User){}

    async createUser(userDto:UserDto): Promise<void>{
        try{
            await this.userModel.create(userDto as any);
        }catch(error){
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        }
    }

    async findUser(username:string): Promise<User>{
        try{
            return await this.userModel.findOne({where: {username:username}});
        }catch(error){
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        }
    }

    async deleteUser(username:string): Promise<number>{
        try{
            return await this.userModel.destroy({where: {username:username}});
        }catch(error){
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        }
    }
}