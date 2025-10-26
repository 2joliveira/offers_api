import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from './prisma/repositories/users-repository';
import { CategoriesRepository } from './prisma/repositories/categories-repository';
import { PostsRepository } from './prisma/repositories/posts-repository';

@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    PostsRepository,
  ],
  exports: [UsersRepository, CategoriesRepository, PostsRepository],
})
export class DatabaseModule {}
