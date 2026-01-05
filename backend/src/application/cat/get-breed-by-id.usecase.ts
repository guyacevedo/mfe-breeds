import { Injectable } from '@nestjs/common';
import { TheCatApiClient } from '@infrastructure/http/thecatapi.client';

@Injectable()
export class GetBreedByIdUseCase {
  constructor(private readonly client: TheCatApiClient) {}

  execute(id: string) {
    return this.client.getBreedById(id);
  }
}
