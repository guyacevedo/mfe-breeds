import { Injectable } from '@nestjs/common';
import { TheCatApiClient } from '@infrastructure/http/thecatapi.client';

@Injectable()
export class GetImagesByBreedUseCase {
  constructor(private readonly client: TheCatApiClient) {}

  execute(breedId: string) {
    return this.client.getImagesByBreed(breedId);
  }
}
