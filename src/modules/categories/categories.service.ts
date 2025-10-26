import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.controller';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    console.log({ createCategoryDto });
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: string) {
    return `This action returns a #${id} category`;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    console.log({ updateCategoryDto });
    return `This action updates a #${id} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
