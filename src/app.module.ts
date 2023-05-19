import { Post } from './../mymodel/entities/Post';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { User } from 'mymodel/entities/User';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.PORT, //이부분은 환경 변수 안되는데 질문  process.env.PORT  3306
      username: 'root',
      password: process.env.PASSWORD,
      database: 'nest_board',
      entities: [Post, User],
      synchronize: true,
    }),
    PostModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
