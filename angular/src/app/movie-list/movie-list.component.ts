import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

export class Movie {
  constructor(
    public adult: boolean,
    public backdrop_path: string | null,
    public belongs_to_collection: null | object,
    public budget: number,
    public genres: { id: number, name: string }[],
    public homepage: string | null,
    public id: number,
    public imdb_id: string | null,
    public original_language: string,
    public original_title: string,
    public overview: string | null,
    public popularity: number,
    public poster_path: string | null,
    public production_companies:
      { name: string, id: number, logo_path: string | null, origin_country: string }[],
    public production_countries: { iso_3166_1: string, name: string },
    public release_date: string,
    public revenue: number,
    public runtime: number | null,
    public spoken_languages: { iso_639_1: string, name: string },
    public status: string,
    public tagline: string | null,
    public title: string,
    public video: boolean,
    public vote_average: number,
    public vote_count: number
  ) {}
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieList: Movie[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.createNewList();
  }

  createNewList() {
    this.taskService.getMovies('/trending/movie/week?api_key=8c20094b9d32bd14049b323d7d8294d0')
      .subscribe((response: any) => {
        console.log(response);
        this.movieList = response.results;
      });
  }

}
