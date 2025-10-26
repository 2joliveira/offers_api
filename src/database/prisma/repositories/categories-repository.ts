import { Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.CategoryCreateArgs) {
    return await this.prismaService.category.create(data);
  }

  async findOne(id: string) {
    return await this.prismaService.category.findUnique({ where: { id } });
  }

  async findAll() {
    return await this.prismaService.category.findMany();
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    return await this.prismaService.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prismaService.category.delete({ where: { id } });
  }
}
