import { Controller, Get, Query } from '@nestjs/common';
import { GetImagesByBreedUseCase } from '@application/cat/get-images-by-breed.usecase';

@Controller('images')
export class ImagesController {
  constructor(private readonly useCase: GetImagesByBreedUseCase) {}

  @Get('by-breed')
  find(@Query('breedId') breedId: string) {
    return this.useCase.execute(breedId);
  }
}
