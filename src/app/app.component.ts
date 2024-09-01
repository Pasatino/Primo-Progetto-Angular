import { Component, OnInit } from '@angular/core';
import { TmdbService } from './services/tmdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  movies: any[] = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    // Scopri i film popolari, caricando le prime due pagine
    this.tmdbService.discoverMovies(1).subscribe(
      (data) => {
        this.movies = data.results;
        console.log('Prima pagina di film:', this.movies);
        this.loadMoreMovies(); // Carica la seconda pagina
      },
      (error) => {
        console.error('Errore API:', error);
      }
    );
  }

  loadMoreMovies(): void {
    this.tmdbService.discoverMovies(2).subscribe(
      (data) => {
        this.movies = [...this.movies, ...data.results]; // Aggiunge i film della seconda pagina
        console.log('Film dopo due pagine:', this.movies);
      },
      (error) => {
        console.error('Errore API:', error);
      }
    );
  }
}
