// src/services/post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { UniquePost } from '../entities/unique-post.entity';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(UniquePost)
    private uniquePostRepository: Repository<UniquePost>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = new Post();
    post.uniquePosts = createPostDto.data.map((data) => {
      const uniquePost = new UniquePost();
      uniquePost.unique_post_id = data.id;
      uniquePost.type = data.type;
      uniquePost.props = data.props;
      uniquePost.content = data.content;
      uniquePost.children = data.children;
      return uniquePost;
    });

    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['uniquePosts'] });
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['uniquePosts'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }
}
