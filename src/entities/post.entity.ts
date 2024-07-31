// src/entities/post.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UniquePost } from './unique-post.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UniquePost, (uniquePost) => uniquePost.post, {
    cascade: true,
  })
  uniquePosts: UniquePost[];
}
