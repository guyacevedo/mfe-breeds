import { Injectable } from '@nestjs/common';
import { TheCatApiClient } from '@infrastructure/http/thecatapi.client';

@Injectable()
export class GetBreedsUseCase {
  constructor(private readonly client: TheCatApiClient) {}

  execute(limit = 10, page = 0) {
    return this.client.getBreeds(limit, page);
  }
}
