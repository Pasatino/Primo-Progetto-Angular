import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-lista-film',
  templateUrl: './lista-film.component.html',
  styleUrl: './lista-film.component.css'
})
export class ListaFilmComponent implements OnInit{

  @Input() movies: any[] = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.tmdbService.discoverMovies().subscribe(
      (data) => {
        this.movies = data.results;
      },
      (error) => {
        console.error('Errore nel recuperare i film:', error);
      }
    );
  }

  getMoviePoster(path: string): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'path/to/fallback-image.jpg';
  }
}
