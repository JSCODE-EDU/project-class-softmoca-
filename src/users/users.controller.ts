import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '인증테스트' })
  @Get()
  getUsers() {}

  @ApiOperation({ summary: '회원가입' })
  @Post('create')
  async createUsers(@Body() data: CreateUserDto) {
    await this.usersService.createUsers(
      data.email,
      data.nickName,
      data.phone,
      data.password,
    );
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @Post('logout')
  logOut() {}
}
