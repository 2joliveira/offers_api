import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './posts.controller';

@Injectable()
export class PostsService {
  create(createPostDto: CreatePostDto) {
    console.log({ createPostDto });
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: string) {
    return `This action returns a #${id} post`;
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    console.log({ updatePostDto });
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
