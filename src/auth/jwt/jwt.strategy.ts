import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'mymodel/entities/User';
import { Repository } from 'typeorm';

@Injectable() // 다른곳에서도 사용하기 위해
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      //부모 컴포넌트껄 사용하기 위해
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'sercetkey', //토큰이 유요한지 확인할 때 사용
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const user: User = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user) {
      return user; // request.user
    } else {
      throw new UnauthorizedException('jset_strategy접근 오류');
    }
  }
}
