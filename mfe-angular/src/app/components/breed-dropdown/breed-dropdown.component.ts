import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Breed, LoadingState } from '@mfe-breeds/mfe-shared';
import { BreedService } from '../../services/breed.service';

@Component({
  selector: 'app-breed-dropdown',
  templateUrl: './breed-dropdown.component.html',
  styleUrls: ['./breed-dropdown.component.scss'],
})
export class BreedDropdownComponent implements OnInit, OnDestroy {
  breeds$: Observable<Breed[]>;
  loadingState$: Observable<LoadingState>;

  selectedBreed: Breed | null = null;
  searchTerm: string = '';
  isDropdownOpen: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private breedService: BreedService) {
    console.log('BreedDropdownComponent constructor');
    this.breeds$ = this.breedService.breeds;
    this.loadingState$ = this.breedService.loadingState;
  }

  ngOnInit(): void {
    console.log('BreedDropdownComponent ngOnInit');
    // Load breeds on component init
    this.loadBreeds();

    // Subscribe to selected breed changes
    this.breedService.selectedBreed
      .pipe(takeUntil(this.destroy$))
      .subscribe((breed) => {
        this.selectedBreed = breed;
        console.log('Selected breed updated:', breed);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(): void {
    console.log('onSearchInput called with:', this.searchTerm);
    if (this.searchTerm.trim()) {
      console.log('Searching for:', this.searchTerm);
      this.breedService
        .searchBreeds(this.searchTerm)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (results) => console.log('Search results:', results),
          error: (error) => console.error('Search error:', error),
          complete: () => console.log('Search complete')
        });
    } else {
      console.log('Search term empty, loading all breeds');
      this.loadBreeds();
    }
  }

  onBreedSelect(breed: Breed): void {
    this.selectedBreed = breed;
    this.breedService.selectBreed(breed);
    this.isDropdownOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onRetry(): void {
    this.loadBreeds();
  }

  private loadBreeds(): void {
    console.log('BreedDropdownComponent loadBreeds called');
    this.breedService
      .loadBreeds(50, 0) // Load more for better dropdown experience
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (breeds) => console.log('Breeds loaded:', breeds),
        error: (error) => console.error('Error loading breeds:', error),
        complete: () => console.log('Breeds loading complete')
      });
  }
}
