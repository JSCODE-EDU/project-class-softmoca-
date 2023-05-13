import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
class SearchTitleParams {
  @IsNotEmpty()
  @MinLength(1)
  title: string;
}

@Controller('posts')
export class PostController {
  constructor(private postservice: PostService) {}

  @Get()
  getAllPost() {
    return this.postservice.getAllPost();
  }

  @Get(':id')
  getOnePost(@Param('id') id: number) {
    return this.postservice.getOnePost(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    const { title, content } = createPostDto;
    return this.postservice.createPost(title, content);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updataPostDto: UpdatePostDto) {
    return await this.postservice.update(id, updataPostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.postservice.delete(id);
  }

  @Get('/search/:title')
  async search(@Param('title', ValidationPipe) params: SearchTitleParams) {
    const { title } = params;
    return await this.postservice.search(title);
  }

  // @Get('/search/:title')
  // async search(@Param('title') title: string) {
  //   return await this.postservice.search(title);
  // }
}
