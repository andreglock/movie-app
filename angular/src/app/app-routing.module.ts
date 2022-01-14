import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'trending', component: MovieListComponent},
  { path: 'search', component: SearchComponent},
  { path: 'moviePage', component: MoviePageComponent},
  { path: '**', redirectTo: '/trending' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
