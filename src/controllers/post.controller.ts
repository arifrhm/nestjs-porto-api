// src/controllers/post.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post as PostEntity } from '../entities/post.entity';

@Controller('api/data')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    console.log('Incoming request body:', JSON.stringify(createPostDto));
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.postService.findById(id);
  }
}
