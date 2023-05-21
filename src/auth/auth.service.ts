import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'mymodel/entities/User';
import { Repository } from 'typeorm';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;
    const user = await this.userRepository.findOneBy({ email });
    const userWithoutPassword = { ...user };

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
