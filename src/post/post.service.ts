import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'mymodel/entities/Post';

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
    return await this.postRepository.find();
  }

  async getOnePost(id: number) {
    return await this.postRepository.findOneBy({ id });
  }
}
