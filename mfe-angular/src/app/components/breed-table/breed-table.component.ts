import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Breed } from '@mfe-breeds/mfe-shared';

@Component({
  selector: 'app-breed-table',
  template: `
    <div class="breed-table-container">
      <div class="search-section">
        <input
          type="text"
          [(ngModel)]="searchTerm"
          (keyup.enter)="onSearchSubmit()"
          placeholder="Search breeds by name or origin..."
          class="search-input"
        />
        <button (click)="onSearchSubmit()" class="search-btn">Search</button>
        <button *ngIf="searchTerm" (click)="clearSearch()" class="clear-btn">
          Clear
        </button>
      </div>

      <div class="table-wrapper" *ngIf="!isLoading">
        <table class="breed-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Origin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              *ngFor="let breed of filteredBreeds; trackBy: trackByBreedId"
              (click)="onSelectBreed(breed)"
            >
              <td>
                <strong>{{ breed.name }}</strong>
              </td>
              <td>{{ breed.origin }}</td>
              <td>
                <button class="select-btn" (click)="onSelectBreed(breed)">
                  Select
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="no-results"
        *ngIf="!isLoading && filteredBreeds.length === 0 && searchTerm"
      >
        <h3>No results found</h3>
        <p>No breeds match your search for "{{ searchTerm }}".</p>
        <button (click)="clearSearch()" class="clear-search-btn">
          Clear Search
        </button>
      </div>

      <div
        class="empty-state"
        *ngIf="!isLoading && filteredBreeds.length === 0 && !searchTerm"
      >
        <h3>No breeds available</h3>
        <p>Start by loading breeds or using search.</p>
      </div>
    </div>
  `,
  styleUrls: ['./breed-table.component.scss'],
})
export class BreedTableComponent {
  @Input() breeds: Breed[] = [];
  @Input() searchTerm: string = '';
  @Input() isLoading: boolean = false;

  @Output() breedSelected = new EventEmitter<Breed>();
  @Output() searchRequested = new EventEmitter<string>();

  get filteredBreeds(): Breed[] {
    if (!this.searchTerm.trim()) {
      return this.breeds;
    }

    const searchLower = this.searchTerm.toLowerCase();
    return this.breeds.filter(
      (breed) =>
        breed.name.toLowerCase().includes(searchLower) ||
        breed.origin.toLowerCase().includes(searchLower)
    );
  }

  onSelectBreed(breed: Breed): void {
    this.breedSelected.emit(breed);
  }

  onSearchSubmit(): void {
    this.searchRequested.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchRequested.emit('');
  }

  trackByBreedId(index: number, breed: Breed): string {
    return breed.id;
  }
}
