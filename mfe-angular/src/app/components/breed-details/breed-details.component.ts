import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Breed } from '@mfe-breeds/mfe-shared';

@Component({
  selector: 'app-breed-details',
  templateUrl: './breed-details.component.html',
  styleUrls: ['./breed-details.component.scss'],
})
export class BreedDetailsComponent implements OnInit, OnDestroy {
  @Input() breed: Breed | null = null;

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
