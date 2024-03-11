import { Column, ForeignKey, Model ,Table } from "sequelize-typescript";
import { Chat } from "src/chat/chat.model";
import { User } from "src/user/user.model";


@Table
export class UserChat extends Model{

    @Column({primaryKey: true , autoIncrement: true})
    userChatID: number;

    @ForeignKey(()=>User)
    @Column
    username: string;

    @ForeignKey(()=>Chat) 
    @Column
    chatID: number; 
}