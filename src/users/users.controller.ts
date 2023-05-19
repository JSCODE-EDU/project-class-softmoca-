import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: '인증테스트' })
  @Get()
  getUsers() {}

  @ApiOperation({ summary: '회원가입' })
  @Post('create')
  createUsers(@Body() data: CreateUserDto) {
    this.usersService.createUsers(
      data.email,
      data.nickName,
      data.phone,
      data.password,
    );
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {}

  @Post('logout')
  logOut() {}
}
