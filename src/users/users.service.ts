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
    _phone: string,
    password: string,
  ) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && user.email) {
      throw new HttpException({ message: '존재하는 이메일입니다.' }, 201);
    }

    if (user) {
      throw new HttpException({ message: '이미 존재하는 user 입니다.' }, 201);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User();
    (newUser.email = email),
      (newUser.nickName = nickname),
      (newUser.phone = _phone),
      (newUser.password = hashedPassword);

    return await this.usersRepository.save(newUser);
  }
}
