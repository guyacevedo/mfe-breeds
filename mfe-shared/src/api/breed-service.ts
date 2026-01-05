import { BehaviorSubject, Observable } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { Breed, LoadingState } from "../domain";

const API_BASE_URL = "http://localhost:3000";

export class BreedService {
  private readonly loadingState$ = new BehaviorSubject<LoadingState>({
    isLoading: false,
    error: null,
  });

  private readonly breeds$ = new BehaviorSubject<Breed[]>([]);
  private readonly selectedBreed$ = new BehaviorSubject<Breed | null>(null);

  getBreeds(limit: number = 10, page: number = 0): Observable<Breed[]> {
    this.setLoading(true, null);

    const url = `${API_BASE_URL}/breeds?limit=${limit}&page=${page}`;

    return this.makeRequest(url).pipe(
      map((response: any): Breed[] => {
        // Handle both ApiResponse and direct array responses
        return response.data || response;
      }),
      tap((breeds: Breed[]) => {
        this.breeds$.next(breeds);
      }),
      finalize(() => this.setLoading(false, null)),
      catchError((error) => {
        this.setLoading(false, "Failed to load breeds");
        throw error;
      })
    );
  }

  getBreedById(id: string): Observable<Breed> {
    this.setLoading(true, null);

    const url = `${API_BASE_URL}/breeds/${id}`;

    return this.makeRequest(url).pipe(
      map((response: any): Breed => {
        // Handle both ApiResponse and direct object responses
        return response.data || response;
      }),
      tap((breed: Breed) => {
        this.selectedBreed$.next(breed);
      }),
      finalize(() => this.setLoading(false, null)),
      catchError((error) => {
        this.setLoading(false, `Failed to load breed: ${id}`);
        throw error;
      })
    );
  }

  searchBreeds(query: string): Observable<Breed[]> {
    console.log("CatService.searchBreeds called with:", query);
    if (!query.trim()) {
      console.log("Query empty, returning existing breeds");
      return this.breeds$.asObservable();
    }

    console.log(
      "Making search request to:",
      `${API_BASE_URL}/breeds/search?q=${encodeURIComponent(query)}`
    );
    this.setLoading(true, null);

    const url = `${API_BASE_URL}/breeds/search?q=${encodeURIComponent(query)}`;

    return this.makeRequest(url).pipe(
      map((response: any): Breed[] => {
        console.log("Search response received:", response);
        return response.data || response;
      }),
      finalize(() => this.setLoading(false, null)),
      catchError((error) => {
        console.error("Search error:", error);
        this.setLoading(false, "Failed to search breeds");
        throw error;
      })
    );
  }

  getBreeds$(): Observable<Breed[]> {
    return this.breeds$.asObservable();
  }

  getSelectedBreed$(): Observable<Breed | null> {
    return this.selectedBreed$.asObservable();
  }

  getLoadingState$(): Observable<LoadingState> {
    return this.loadingState$.asObservable();
  }

  setSelectedBreed(breed: Breed | null): void {
    this.selectedBreed$.next(breed);
  }

  private makeRequest(url: string): Observable<any> {
    return new Observable<any>((subscriber) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          subscriber.next(data);
          subscriber.complete();
        })
        .catch((error) => {
          this.setLoading(false, error.message);
          subscriber.error(error);
        });
    });
  }

  private setLoading(isLoading: boolean, error: string | null): void {
    this.loadingState$.next({ isLoading, error });
  }
}

export const breedService = new BreedService();
