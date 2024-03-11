import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SendMessageDto{
    @IsNumber()
    @IsNotEmpty()
    chatID: number;

    @IsString()
    @IsNotEmpty()
    message: string;
}