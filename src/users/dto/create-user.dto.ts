import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Matches(/^[^\s@]*@[^@\s]*$/, { message: '올바른 이메일 형식이 아닙니다.' })
  readonly email: string;
  public nickName: string;
  readonly phone: string;
  @Length(8, 15, { message: '비밀번호는 8자 이상 15자 이하여야 합니다.' })
  @Matches(/^[^\s]+$/, { message: '비밀번호에 공백을 포함할 수 없습니다.' })
  readonly password: string;
}
