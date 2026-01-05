import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { GetBreedByIdUseCase } from "@application/cat/get-breed-by-id.usecase";
import { GetBreedsUseCase } from "@application/cat/get-breeds.usecase";
import { SearchBreedsUseCase } from "@application/cat/search-breeds.usecase";
import { GetImagesByBreedUseCase } from "@application/cat/get-images-by-breed.usecase";
import { BreedsController } from "@infrastructure/controllers/breeds.controller";
import { ImagesController } from "@infrastructure/controllers/images.controller";
import { TheCatApiClient } from "@infrastructure/http/thecatapi.client";

@Module({
  imports: [HttpModule],
  controllers: [BreedsController, ImagesController],
  providers: [
    TheCatApiClient,
    GetBreedByIdUseCase,
    GetBreedsUseCase,
    SearchBreedsUseCase,
    GetImagesByBreedUseCase,
  ],
})
export class CatModule {}
