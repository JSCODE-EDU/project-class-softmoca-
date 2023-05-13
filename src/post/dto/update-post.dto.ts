import { IsNotEmpty, MaxLength, MinLength, Matches } from 'class-validator';
export class UpdatePostDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(15)
  @Matches(/^\S.*\S$/) //정규표현식
  title: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  content: string;
}
