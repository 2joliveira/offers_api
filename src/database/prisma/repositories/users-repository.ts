import { Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateArgs) {
    return await this.prismaService.user.create(data);
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByUsername(userName: string) {
    return await this.prismaService.user.findUnique({
      where: {
        userName,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return await this.prismaService.user.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
