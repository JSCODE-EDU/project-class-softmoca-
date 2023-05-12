import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private postservice: PostService) {}

  @Get('/find')
  getAllPost() {
    return this.postservice.getAllPost();
  }

  @Get('/find/:id')
  getOnePost(@Param('id') id: number) {
    return this.postservice.getOnePost(id);
  }

  @Post('/create')
  create(@Body() createPostDto: CreatePostDto) {
    const { title, content } = createPostDto;
    return this.postservice.createPost(title, content);
  }
}
