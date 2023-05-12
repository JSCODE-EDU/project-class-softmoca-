import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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
}
