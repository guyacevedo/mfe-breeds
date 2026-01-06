import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Breed } from '@mfe-breeds/mfe-shared';

@Component({
  selector: 'app-breed-details',
  template: `
    <div class="breed-details" *ngIf="breed">
      <h2>{{ breed.name }}</h2>
      <p><strong>Origin:</strong> {{ breed.origin }}</p>
      <p><strong>Description:</strong> {{ breed.description }}</p>
      <p><strong>Temperament:</strong> {{ breed.temperament }}</p>

      <div class="images-section">
        <h3>Images</h3>
        <div class="image-placeholder">
          <p>Images will be available when connected to backend</p>
        </div>
      </div>
    </div>

    <div class="no-breed" *ngIf="!breed">
      <h3>No Breed Selected</h3>
      <p>Please select a breed from the dropdown to view details.</p>
    </div>
  `,
  styleUrls: ['./breed-details.component.scss'],
})
export class BreedDetailsComponent implements OnInit, OnDestroy {
  @Input() breed: Breed | null = null;
  @Input() searchEnabled: boolean = true;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get hasBreed(): boolean {
    return !!this.breed;
  }
}
