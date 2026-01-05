import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Breed } from '@mfe-breeds/mfe-shared';

@Component({
  selector: 'app-breed-carousel',
  templateUrl: './breed-carousel.component.html',
  styleUrls: ['./breed-carousel.component.scss']
})
export class BreedCarouselComponent implements OnChanges {
  @Input() breed: Breed | null = null;
  @Input() images: string[] = [];

  currentImageIndex: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && changes['images'].currentValue && this.images.length > 0) {
      this.currentImageIndex = 0;
    }
  }

  get currentImage(): string {
    return this.images[this.currentImageIndex] || 'https://via.placeholder.com/400x300?text=No+Image';
  }

  nextImage(): void {
    if (this.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
  }

  previousImage(): void {
    if (this.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    }
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  get hasImages(): boolean {
    return this.images && this.images.length > 0;
  }

  get imageCounter(): string {
    return `${this.currentImageIndex + 1} / ${this.images.length}`;
  }
}
