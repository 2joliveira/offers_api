import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from 'src/database/prisma/repositories/users-repository';
import { CreateUserDto, UpdateUserDto } from './users.controller';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    try {
      const [userWithSameEmail, userWithSameUsername] = await Promise.all([
        this.usersRepository.findByEmail(data.email),
        this.usersRepository.findByUsername(data.userName),
      ]);

      if (userWithSameEmail) {
        throw new ConflictException('E-mail já cadastrado!');
      }

      if (userWithSameUsername) {
        throw new ConflictException('UserName já existe!');
      }

      return this.usersRepository.create({
        data,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.findAll();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOne(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const [userWithSameEmail, userWithSameUsername] = await Promise.all([
        data.email && this.usersRepository.findByEmail(data.email),
        data.userName && this.usersRepository.findByUsername(data.userName),
      ]);

      if (userWithSameEmail) {
        throw new ConflictException('E-mail já cadastrado!');
      }

      if (userWithSameUsername) {
        throw new ConflictException('UserName já existe!');
      }

      return await this.usersRepository.update(id, data);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.usersRepository.remove(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
