// src/controllers/tag.controller.ts

import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { TagService } from '../services/tag.service';
import { CreateTagDto } from '../dto/create-tag.dto';
import { Tag } from '../entities/tag.entity';

@Controller('api/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.createTag(createTagDto);
  }

  @Get()
  async getTags(@Query('postId') postId?: number) {
    // Retrieve tags based on optional postId query parameter
    return await this.tagService.findAll(postId);
  }
}
