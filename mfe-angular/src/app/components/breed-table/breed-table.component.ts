import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Breed } from '@mfe-breeds/mfe-shared';

@Component({
  selector: 'app-breed-table',
  templateUrl: './breed-table.component.html',
  styleUrls: ['./breed-table.component.scss'],
})
export class BreedTableComponent {
  @Input() breeds: Breed[] = [];
  @Input() searchTerm: string = '';
  @Input() isLoading: boolean = false;

  @Input() currentPage: number = 1;
  @Input() pageSize: number = 5;

  @Output() breedSelected = new EventEmitter<Breed>();
  @Output() searchRequested = new EventEmitter<string>();
  @Output() pageChanged = new EventEmitter<{ page: number; size: number }>();

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

  trackByBreedId(index: number, breed: Breed): string {
    return breed.id;
  }

  // Al no saber el total, solo podemos validar que no baje de 1.
  // La validación de "siguiente" la hará el padre o la longitud del array actual.
  onPageChange(direction: number): void {
    const nextPage = this.currentPage + direction;
    if (nextPage >= 1) {
      this.pageChanged.emit({
        page: nextPage,
        size: this.pageSize,
      });
    }
  }

  // Si la búsqueda cambia, notificamos al padre para resetear a página 1
  onSearchSubmit(): void {
    this.pageChanged.emit({ page: 1, size: this.pageSize });
    this.searchRequested.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.pageChanged.emit({ page: 1, size: this.pageSize });
    this.searchRequested.emit('');
  }
}
