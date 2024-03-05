import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserRegisterDto } from "src/auth/dto/userRegister.dto";
import { User } from "./user.model";


@Injectable()
export class UserService{

    constructor(@InjectModel(User) private userModel: typeof User){}

    async createUser(userRegisterDto: UserRegisterDto): Promise<void>{
        try{
            await this.userModel.create(userRegisterDto as any);
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
}