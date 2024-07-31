// src/dto/create-post.dto.ts
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PropsDto {
  textColor: string;
  backgroundColor: string;
  textAlignment: string;
  level: number;
  name: string;
  url: string;
  caption: string;
  showPreview: boolean;
  previewWidth: number;
}

class ContentItemDto {
  type: string;
  text: string;
  styles: Record<string, any>;
}

class UniquePostDto {
  id: string;
  type: string;
  props: PropsDto;
  content: ContentItemDto[];
  children: ContentItemDto[];
}

export class CreatePostDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UniquePostDto)
  data: UniquePostDto[];
}
