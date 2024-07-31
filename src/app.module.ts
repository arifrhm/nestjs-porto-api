// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UniquePost } from './entities/unique-post.entity';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db',
      entities: [Post, UniquePost],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Post, UniquePost]),
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class AppModule {}
