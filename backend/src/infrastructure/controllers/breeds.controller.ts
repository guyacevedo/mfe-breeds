import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetBreedByIdUseCase } from '@application/cat/get-breed-by-id.usecase';
import { GetBreedsUseCase } from '@application/cat/get-breeds.usecase';
import { SearchBreedsUseCase } from '@application/cat/search-breeds.usecase';


@Controller('breeds')
export class BreedsController {
  constructor(
    private readonly getBreeds: GetBreedsUseCase,
    private readonly getBreedById: GetBreedByIdUseCase,
    private readonly searchBreeds: SearchBreedsUseCase,
  ) {}

  @Get()
  findAll(@Query('limit') limit = 10, @Query('page') page = 0) {
    return this.getBreeds.execute(+limit, +page);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.searchBreeds.execute(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getBreedById.execute(id);
  }
}
