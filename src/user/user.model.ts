import { Model, BelongsToMany, Column, Table } from "sequelize-typescript";
import { Chat } from "src/chat/chat.model";
import { UserChat } from "src/user-chat/user-chat.model";


@Table
export class User extends Model{

    @Column({primaryKey: true})
    username: string

    @Column({allowNull: false})
    password: string

    @BelongsToMany( ()=>Chat , { through: {model: ()=>UserChat} })
    chatsOfUser: Chat[]
}