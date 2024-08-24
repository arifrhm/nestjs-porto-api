// src/entities/tag.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { UniquePost } from './unique-post.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  @JoinTable() // This will create a junction table for Post and Tag
  posts: Post[];

  @ManyToOne(() => UniquePost, (uniquePost) => uniquePost.tags)
  uniquePost: UniquePost;
}
