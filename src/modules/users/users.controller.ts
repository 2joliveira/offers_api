import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import z from 'zod';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation-pipe';
import { Public } from '../auth/public';

const createUserDto = z.object({
  name: z.string().trim().min(2),
  userName: z.string().trim().min(3),
  email: z.email(),
  password: z.string().trim().min(5),
});

const updateUserDto = createUserDto.partial();

export type CreateUserDto = z.infer<typeof createUserDto>;

export type UpdateUserDto = z.infer<typeof updateUserDto>;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserDto)) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
