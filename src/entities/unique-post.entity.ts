// src/entities/unique-post.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class UniquePost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unique_post_id: string;

  @Column('text', { nullable: true })
  type: string;

  @Column('simple-json', { nullable: true })
  props: Record<string, any>;

  @Column('simple-json', { nullable: true })
  content: Record<string, any>[];

  @Column('simple-json', { nullable: true })
  children: Record<string, any>[];

  @ManyToOne(() => Post, (post) => post.uniquePosts)
  post: Post;
}
