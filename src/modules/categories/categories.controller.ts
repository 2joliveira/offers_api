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
import { CategoriesService } from './categories.service';
import z from 'zod';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation-pipe';

const createCategoryDto = z.object({
  name: z.string().trim().min(2),
});

const updateCategoryDto = createCategoryDto.partial();

export type CreateCategoryDto = z.infer<typeof createCategoryDto>;

export type UpdateCategoryDto = z.infer<typeof updateCategoryDto>;

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCategoryDto))
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCategoryDto))
    updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
