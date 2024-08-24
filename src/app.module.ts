// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UniquePost } from './entities/unique-post.entity';
import { Tag } from './entities/tag.entity';  // Import the Tag entity
import { PostService } from './services/post.service';
import { TagService } from './services/tag.service';  // Import the Tag service
import { PostController } from './controllers/post.controller';
import { TagController } from './controllers/tag.controller';  // Import the Tag controller

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db',
      entities: [Post, UniquePost, Tag],  // Add Tag entity to the list
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Post, UniquePost, Tag]),  // Add Tag to TypeOrmModule.forFeature
  ],
  providers: [PostService, TagService],  // Add TagService to the providers array
  controllers: [PostController, TagController],  // Add TagController to the controllers array
})
export class AppModule {}
