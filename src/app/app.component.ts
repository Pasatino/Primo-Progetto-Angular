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
    this.tmdbService.searchMovies('Inception').subscribe(
      (data) => {
        this.movies = data.results;
        console.log(this.movies); // Verifica che i dati siano presenti
      },
      (error) => {
        console.error('Errore API:', error);
      }
    );
  }
}
