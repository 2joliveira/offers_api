import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './posts.controller';
import { PostsRepository } from 'src/database/prisma/repositories/posts-repository';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto) {
    try {
      return await this.postsRepository.create({
        data: createPostDto,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.postsRepository.findAll();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findByUser(userId: string) {
    try {
      return await this.postsRepository.findByUser(userId);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.postsRepository.findOne(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      return await this.postsRepository.update(id, updatePostDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.postsRepository.remove(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
