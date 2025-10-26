import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import z from 'zod';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation-pipe';

const createPostDto = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().min(2),
  originalPrice: z.number().positive(),
  promotionalPrice: z.number().positive(),
  link: z.url(),
  userId: z.uuid(),
  categoryId: z.uuid(),
});

const updatePostDto = createPostDto.partial();

export type CreatePostDto = z.infer<typeof createPostDto>;

export type UpdatePostDto = z.infer<typeof updatePostDto>;

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPostDto))
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get(':id/users')
  finByUser(@Param('id') userId: string) {
    return this.postsService.findByUser(userId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePostDto)) updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
