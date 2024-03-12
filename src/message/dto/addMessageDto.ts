import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddMessageDto{
    @IsNumber()
    @IsNotEmpty()
    chatID: number;

    @IsString()
    @IsNotEmpty()
    senderUsername: string;

    @IsString()
    @IsNotEmpty()
    text: string;
}