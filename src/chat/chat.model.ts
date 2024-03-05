import { Model ,BelongsToMany, Column, Table, HasMany } from "sequelize-typescript";
import { Message } from "src/message/message.model";
import { UserChat } from "src/user-chat/user-chat.model";
import { User } from "src/user/user.model";


@Table
export class Chat extends Model{

    @Column({primaryKey: true , autoIncrement: true})
    chatID: number;

    @Column({allowNull: false})
    title: string;

    @HasMany(()=>Message)
    chatMessages: Message[]

    @BelongsToMany(()=>User ,  { through: {model: ()=>UserChat } } )
    chatUsers: User[];
}