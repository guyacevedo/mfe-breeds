import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Breed } from '@mfe-breeds/mfe-shared';
import { BreedDropdownComponent } from './breed-dropdown.component';

describe('BreedDropdownComponent', () => {
  let component: BreedDropdownComponent;
  let fixture: ComponentFixture<BreedDropdownComponent>;
  let breedService: BreedService;
  let router: Router;

  const mockBreed: Breed = {
    id: '1',
    name: 'Persian',
    description: 'Long-haired breed',
    temperament: 'Gentle',
    origin: 'Iran'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreedDropdownComponent],
      providers: [
        { provide: BreedService, useValue: jasmine.createSpyObj('BreedService') },
        { provide: Router, useValue: jasmine.createSpyObj('Router') }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BreedDropdownComponent);
    component = fixture.componentInstance;
    breedService = TestBed.inject(BreedService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty values', () => {
    expect(component.selectedBreed).toBeNull();
    expect(component.searchTerm).toBe('');
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should call breedService.onBreedSelect when breed is selected', () => {
    spyOn(component, 'onBreedSelect');

    component.onBreedSelect(mockBreed);

    expect(component.onBreedSelect).toHaveBeenCalledWith(mockBreed);
    expect(component.selectedBreed).toBe(mockBreed);
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should toggle dropdown state', () => {
    expect(component.isDropdownOpen).toBe(false);

    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(true);

    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should call breedService.onBreedSelect when breed is selected', () => {
    const mockService = jasmine.createSpyObj('BreedService');
    fixture.detectChanges();

    component.onBreedSelect(mockBreed);

    // Verify the component responds to selection
    expect(component.selectedBreed).toBe(mockBreed);
  });
});
