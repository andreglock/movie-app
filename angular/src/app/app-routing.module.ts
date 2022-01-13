import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'latest', component: MovieListComponent},
  { path: 'search', component: SearchComponent},
  { path: '**', redirectTo: '/latest' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
