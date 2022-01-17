import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SearchComponent } from './search/search.component';
import { GenreNamePipe } from './genre-name.pipe';
import { FormsModule } from '@angular/forms';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { PagePipe } from './page.pipe';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    SearchComponent,
    GenreNamePipe,
    MoviePageComponent,
    WatchListComponent,
    PaginationComponent,
    PagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
