import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import z from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';

const createUserDto = z.object({
  name: z.string(),
  userName: z.string(),
  email: z.email(),
  password: z.string(),
});

const updateUserDto = createUserDto.partial();

export type CreateUserDto = z.infer<typeof createUserDto>;

export type UpdateUserDto = z.infer<typeof updateUserDto>;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserDto))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateUserDto))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
