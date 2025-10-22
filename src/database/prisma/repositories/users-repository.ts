import { Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateArgs) {
    return await this.prismaService.user.create(data);
  }
}
