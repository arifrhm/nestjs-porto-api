// src/entities/post.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { UniquePost } from './unique-post.entity';
import { Tag } from './tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UniquePost, (uniquePost) => uniquePost.post, {
    cascade: true,
  })
  uniquePosts: UniquePost[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  tags: Tag[];
}
