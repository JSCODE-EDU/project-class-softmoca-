import { IsNotEmpty, MaxLength, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdatePostDto {
  @ApiProperty({
    example: 'hello everybody',
    description: '수정된 게시물의 제목',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(15)
  @Matches(/^\S.*\S$/) //정규표현식
  title: string;

  @ApiProperty({
    example: 'happy day~~',
    description: '수정된 게시물의 내용',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  content: string;
}
