import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TheCatApiClient {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService
  ) {}

  private headers = {
    "x-api-key": this.configService.get<string>("CAT_API_KEY"),
  };

  private get baseUrl() {
    return this.configService.get<string>("CAT_API_URL");
  }

  async getBreeds(limit: number, page: number) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/breeds`, {
        headers: this.headers,
        params: { limit, page },
      })
    );
    return res.data;
  }

  async getBreedById(id: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/breeds/${id}`, {
        headers: this.headers,
      })
    );
    return res.data;
  }

  async searchBreeds(q: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/breeds/search`, {
        headers: this.headers,
        params: { q, attach_image: 1 },
      })
    );
    return res.data;
  }

  async getImagesByBreed(breedId: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/images/search`, {
        headers: this.headers,
        params: { breed_ids: breedId, limit: 5 },
      })
    );
    return res.data;
  }
}
