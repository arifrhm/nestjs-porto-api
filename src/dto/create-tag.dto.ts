// src/dto/create-tag.dto.ts
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  postId: number;
}
