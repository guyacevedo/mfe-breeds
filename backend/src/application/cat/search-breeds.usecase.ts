import { Injectable } from '@nestjs/common';
import { TheCatApiClient } from '@infrastructure/http/thecatapi.client';

@Injectable()
export class SearchBreedsUseCase {
  constructor(private readonly client: TheCatApiClient) {}

  execute(query: string) {
    return this.client.searchBreeds(query);
  }
}
