import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Breed } from '@mfe-breeds/mfe-shared';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BreedService } from './services/breed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = '🐱 Cat Breed Explorer';
  currentRoute: string = '/';
  breeds: Breed[] = [];
  // Estado de la paginación
  params = {
    page: 0,
    limit: 10,
  };
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private breedService: BreedService) {}

  ngOnInit(): void {
    // Get initial route
    this.loadBreeds();
    this.currentRoute = this.router.url;

    // Listen to route changes
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  get isBreedListRoute(): boolean {
    return this.currentRoute === '/breeds';
  }

  get isBreedDetailsRoute(): boolean {
    return (
      this.currentRoute.startsWith('/breeds/') &&
      this.currentRoute !== '/breeds'
    );
  }

  get showBreedTable(): boolean {
    return this.currentRoute === '/table';
  }

  navigateToBreeds(view: string): void {
    // Usar el router de Angular para navegación interna
    this.currentRoute = view === 'select' ? '/breeds' : '/table';
  }

  private loadBreeds(): void {
    this.isLoading = true; // <--- Iniciar carga
    this.breedService
      .loadBreeds(this.params.limit, this.params.page) // Load more for better dropdown experience
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (breeds) => {
          console.log('Datos recibidos de la API:', breeds);
          console.log('Longitud:', breeds.length);
          this.breeds = breeds;
          this.isLoading = false; // <--- Finalizar carga
        },
        error: (error) => {
          console.error('Error loading breeds:', error);
          this.isLoading = false;
        },
      });
  }

  // Este es el método que responde al (pageChanged)
  handlePageUpdate(event: { page: number; size: number }): void {
    this.params.page = event.page;
    this.params.limit = event.size;

    // Cada vez que cambia la página, pedimos nuevos datos
    this.loadBreeds();
  }

  handleSearch(term: string): void {
    // Guardar el término si fuera necesario para la API
    // Importante: Resetear a la primera página al buscar
    this.params.page = 1;

    // Aquí llamarías a tu servicio pasando también el término de búsqueda
    // Ejemplo: this.loadBreeds(term);
    this.loadBreeds();
  }
}
