import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SearchTitleDto {
  @IsNotEmpty()
  @MinLength(1)
  @Matches(/^\S.*\S$/) //정규표현식
  title: string;
}
