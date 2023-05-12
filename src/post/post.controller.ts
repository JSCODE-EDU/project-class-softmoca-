import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private postservice: PostService) {}

  @Post('/create')
  create(@Body() createPostDto: CreatePostDto) {
    const { title, content } = createPostDto;
    return this.postservice.createPost(title, content);
  }

  @Get('/find')
  getAllPost() {
    return this.postservice.findAllPost();
  }
}
