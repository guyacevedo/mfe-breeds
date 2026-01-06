import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = '@app/mfe-angular';
  currentRoute: string = '/';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Get initial route
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
}
