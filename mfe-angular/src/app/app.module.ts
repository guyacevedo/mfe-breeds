import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreedDropdownComponent } from './components/breed-dropdown/breed-dropdown.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { BreedCarouselComponent } from './components/breed-carousel/breed-carousel.component';
import { BreedTableComponent } from './components/breed-table/breed-table.component';
import { BreedDetailsComponent } from './components/breed-details/breed-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BreedDropdownComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    BreedCarouselComponent,
    BreedTableComponent,
    BreedDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
