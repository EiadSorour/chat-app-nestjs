import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserChatDto{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNumber()
    @IsNotEmpty()
    chatID: number;
}