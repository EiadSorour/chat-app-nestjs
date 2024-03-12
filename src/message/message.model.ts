import { Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Chat } from "src/chat/chat.model";
import { User } from "src/user/user.model";

@Table
export class Message extends Model{

    @Column({primaryKey: true , autoIncrement: true})
    messageID: number;

    @Column({allowNull: false})
    @ForeignKey(()=>User)
    senderUsername: string;

    @Column({allowNull: false})
    text: string

    @Column({allowNull: false})
    @ForeignKey(()=>Chat)
    chatID: number;

    @BelongsTo(()=>Chat)
    chatOfMessage: Chat
}