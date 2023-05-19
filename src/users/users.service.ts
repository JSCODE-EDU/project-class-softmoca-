import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'mymodel/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUsers(
    email: string,
    nickname: string,
    phone: string,
    password: string,
  ) {
    const user = await this.usersRepository.findOne({ where: { email } });

    // if (user) {
    //   throw new HttpException({ message: '이미 존재하는 id 입니다.' }, 201);
    //   return;
    // }

    const hashedPassword = await bcrypt.hash(password, 12);

    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
