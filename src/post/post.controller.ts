import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { ResponsePostDto } from './dto/response-post.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';
class SearchTitleParams {
  @IsNotEmpty()
  @MinLength(1)
  title: string;
}
@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private postservice: PostService) {}

  @ApiResponse({
    status: 500,
    description: 'Server error..',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ResponsePostDto,
  })
  @ApiOperation({ summary: 'API NO.1 모든 게시물 가져오기' })
  @Get()
  getAllPost() {
    return this.postservice.getAllPost();
  }

  @ApiResponse({
    status: 500,
    description: 'Server error..',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ResponsePostDto,
  })
  @ApiParam({
    name: 'post_id',
    description: '가져올 게시물의 id',
    required: true,
  })
  @ApiOperation({ summary: 'API NO.2 id로 특정 게시물 가져오기' })
  @Get(':id')
  getOnePost(@Param('id') id: number) {
    return this.postservice.getOnePost(id);
  }

  // @ApiBody() {
  // description: 'example create post request body',
  // type:CreatePostDto,
  // }
  @UseFilters(HttpExceptionFilter)
  @ApiResponse({
    status: 500,
    description: 'Server error..',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ResponsePostDto,
  })
  @ApiOperation({ summary: 'API NO.3 게시물 생성하기' })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    throw new HttpException('api is broken', 401);
    const { title, content } = createPostDto;
    return this.postservice.createPost(title, content);
  }

  @ApiResponse({
    status: 500,
    description: 'Server error..',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ResponsePostDto,
  })
  @ApiParam({
    name: 'post_id',
    description: '가져올 게시물의 id',
    required: true,
  })
  @ApiOperation({ summary: 'API NO.4 id로 특정 게시물 수정하기' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updataPostDto: UpdatePostDto) {
    return await this.postservice.update(id, updataPostDto);
  }

  @ApiResponse({
    status: 500,
    description: 'Server error..',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ResponsePostDto,
  })
  @ApiParam({
    name: 'post_id',
    description: '가져올 게시물의 id',
    required: true,
  })
  @ApiOperation({ summary: 'API NO.5 게시물 삭제하기' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.postservice.delete(id);
  }

  @ApiResponse({
    status: 500,
    description: 'Server error..',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ResponsePostDto,
  })
  @ApiParam({
    name: 'post_title',
    description: '특정 단어를 포함한 게시물의 제목',
    required: true,
  })
  @ApiOperation({ summary: ' API NO.6  게시물 제목 검색해서 가져오기' })
  @Get('/search/:title')
  async search(@Param('title', ValidationPipe) params: SearchTitleParams) {
    // 질문
    const { title } = params;
    return await this.postservice.search(title);
  }

  // @Get('/search/:title')
  // async search(@Param('title') title: string) {
  //   return await this.postservice.search(title);
  // }
}
