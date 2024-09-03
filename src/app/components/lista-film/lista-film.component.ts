import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-lista-film',
  templateUrl: './lista-film.component.html',
  styleUrl: './lista-film.component.css'
})
export class ListaFilmComponent implements OnInit{

  movies: any[] = [];
  genres: any[] = []; // Array per memorizzare i generi
  p: number = 1;  // Variabile per tenere traccia della pagina corrente
  
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

    this.tmdbService.getGenres().subscribe(
      (data) => {
        this.genres = data.genres;
      },
      (error) => {
        console.error('Errore nel recuperare i generi:', error);
      }
    );
  }

  updateMovieList(movies: any[]): void {
    this.movies = movies;
  }

  getGenreNames(genreIds: number[]): string {
    const genreNames = this.genres
      .filter(genre => genreIds.includes(genre.id))
      .map(genre => genre.name);
    return genreNames.join(', ');
  }


  getMoviePoster(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
  
}
