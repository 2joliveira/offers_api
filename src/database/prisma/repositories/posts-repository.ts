import { Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.PostCreateArgs) {
    return await this.prismaService.post.create(data);
  }

  async findOne(id: string) {
    return await this.prismaService.post.findUnique({ where: { id } });
  }

  async findAll() {
    return await this.prismaService.post.findMany();
  }

  async findByUser(userId: string) {
    return await this.prismaService.post.findMany({ where: { userId } });
  }

  async update(id: string, data: Prisma.PostUpdateInput) {
    return await this.prismaService.post.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prismaService.post.delete({ where: { id } });
  }
}
