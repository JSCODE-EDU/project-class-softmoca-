import { Injectable } from '@nestjs/common';
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

  async createPost(title: string, content: string) {
    const post = new Post();
    (post.title = title), (post.content = content);
    return await this.postRepository.save(post);
  }

  async getAllPost() {
    console.log(process.env);
    return await this.postRepository.find({
      take: 5,
      order: { createdAt: 'desc' },
    });
  }

  async getOnePost(id: number) {
    return await this.postRepository.findOneBy({ id });
  }

  async update(id: number, updataPostDto: UpdatePostDto) {
    const post = await this.getOnePost(id);
    const { title, content } = updataPostDto;

    post.title = title;
    post.content = content;

    return await this.postRepository.save(post);
  }

  async delete(id: number) {
    return await this.postRepository.delete(id);
  }

  async search(title: string) {
    const posts = await this.postRepository.find({
      where: { title: Like(`%${title}%`) },
      order: { createdAt: 'desc' },
      take: 5,
    });

    return posts;
  }
}
