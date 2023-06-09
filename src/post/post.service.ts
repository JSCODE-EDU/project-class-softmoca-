import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Post } from 'mymodel/entities/Post';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(title: string, content: string): Promise<Post> {
    const post = new Post();
    (post.title = title), (post.content = content);
    return await this.postRepository.save(post);
  }

  async getAllPost(): Promise<Post[]> {
    //console.log(process.env);
    return await this.postRepository.find({
      take: 5,
      order: { createdAt: 'desc' },
    });
  }

  async getOnePost(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: number, updataPostDto: UpdatePostDto): Promise<Post> {
    const post = await this.getOnePost(id);
    const { title, content } = updataPostDto;

    post.title = title;
    post.content = content;

    return await this.postRepository.save(post);
  }

  // async delete(id: number): Promise<Post> {
  //   const post = await this.postRepository.delete(id);
  //   if (!post) {
  //     throw new NotFoundException(`Post with ID ${id} not found`);
  //   }

  //   return post;
  // }

  async delete(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    await this.postRepository.delete(id);
    return post;
  }

  async search(title: string): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: { title: Like(`%${title}%`) },
      order: { createdAt: 'desc' },
      take: 5,
    });

    return posts;
  }
}
