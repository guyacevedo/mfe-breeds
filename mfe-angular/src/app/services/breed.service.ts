import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Breed, LoadingState } from '@mfe-breeds/mfe-shared';

// Import the service directly to avoid RxJS version conflicts
import { breedService } from '@mfe-breeds/mfe-shared';

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  private readonly breeds$ = new BehaviorSubject<Breed[]>([]);
  private readonly selectedBreed$ = new BehaviorSubject<Breed | null>(null);
  private readonly loadingState$ = new BehaviorSubject<LoadingState>({
    isLoading: false,
    error: null,
  });

  constructor() {
    console.log('BreedService constructor');
    // Subscribe to shared service with proper subscription management
    const breedsSubscription = breedService.getBreeds$().subscribe({
      next: (breeds) => {
        console.log('BreedService received breeds:', breeds);
        this.breeds$.next(breeds);
      },
      error: (error) => console.error('Error in breeds subscription:', error),
    });

    const selectedBreedSubscription = breedService
      .getSelectedBreed$()
      .subscribe({
        next: (breed) => this.selectedBreed$.next(breed),
        error: (error) =>
          console.error('Error in selected breed subscription:', error),
      });

    const loadingStateSubscription = breedService.getLoadingState$().subscribe({
      next: (state) => this.loadingState$.next(state),
      error: (error) =>
        console.error('Error in loading state subscription:', error),
    });
  }

  loadBreeds(limit: number = 10, page: number = 0): Observable<Breed[]> {
    console.log('BreedService.loadBreeds called with:', limit, page);
    return new Observable((observer) => {
      breedService.getBreeds(limit, page).subscribe({
        next: (breeds) => {
          console.log('BreedService received breeds from catService:', breeds);
          observer.next(breeds);
        },
        error: (error) => {
          console.error('BreedService error:', error);
          observer.error(error);
        },
        complete: () => {
          console.log('BreedService loadBreeds complete');
          observer.complete();
        },
      });
    });
  }

  selectBreed(breed: Breed): void {
    breedService.setSelectedBreed(breed);
  }

  get breeds(): Observable<Breed[]> {
    return this.breeds$.asObservable();
  }

  get selectedBreed(): Observable<Breed | null> {
    return this.selectedBreed$.asObservable();
  }

  get loadingState(): Observable<LoadingState> {
    return this.loadingState$.asObservable();
  }

  searchBreeds(query: string): Observable<Breed[]> {
    console.log('BreedService.searchBreeds called with:', query);
    return new Observable((observer) => {
      breedService.searchBreeds(query).subscribe({
        next: (breeds) => {
          console.log('BreedService search results:', breeds);
          observer.next(breeds);
        },
        error: (error) => {
          console.error('BreedService search error:', error);
          observer.error(error);
        },
        complete: () => {
          console.log('BreedService search complete');
          observer.complete();
        },
      });
    });
  }
}
