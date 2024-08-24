// src/services/tag.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dto/create-tag.dto';
import { Tag } from '../entities/tag.entity';
import { Post } from '../entities/post.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { name, postId } = createTagDto;

    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    const tag = this.tagRepository.create({ name, posts: [post] });
    return this.tagRepository.save(tag);
  }

  async findAll(postId?: number): Promise<Tag[]> {
    if (postId) {
      // Use query builder to filter tags by postId
      return this.tagRepository.createQueryBuilder('tag')
        .leftJoinAndSelect('tag.posts', 'post')
        .where('post.id = :postId', { postId })
        .getMany();
    }
    // Return all tags if no postId is provided
    return this.tagRepository.find();
  }
}
