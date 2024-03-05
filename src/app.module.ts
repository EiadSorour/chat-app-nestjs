import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { UserChatModule } from './user-chat/user-chat.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot( {isGlobal:true} ),
    SequelizeModule.forRoot({
    dialect: process.env.DIALECT as any,
    host: process.env.HOST,
    port: process.env.PORT as any,
    username: process.env.DIALECT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    autoLoadModels: true,
    synchronize: true,
    }),
    UserModule,
    ChatModule,
    UserChatModule,
    MessageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
