import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.controller';
import { CategoriesRepository } from 'src/database/prisma/repositories/categories-repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesRepository.create({
        data: createCategoryDto,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.categoriesRepository.findAll();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.categoriesRepository.findOne(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoriesRepository.update(id, updateCategoryDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.categoriesRepository.remove(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
