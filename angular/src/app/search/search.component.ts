import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

import { Movie } from '../movie-list/movie-list.component';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchItem: string = '';
  faSearch = faSearch;

  movieList: Movie[];

  constructor(private taskService: TaskService) { }

  onSubmit(form: NgForm) {
    console.log(this.searchItem);
    this.taskService.getMovies(`search/movie?api_key=8c20094b9d32bd14049b323d7d8294d0&language=en-US&&include_adult=false&query=${this.searchItem}`)
      .subscribe((response: any) => {
        this.movieList = response.results;
      });
  }

  ngOnInit(): void {
  }

}
