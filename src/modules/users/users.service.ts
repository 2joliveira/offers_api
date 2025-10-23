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

  findByEmail(email: string) {
    try {
      return this.usersRepository.findByEmail(email);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log({ updateUserDto });
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
