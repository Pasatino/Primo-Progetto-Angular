import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private apiKey = '8185619dc105d74b2371de77e58e3523'; // Chiave ottenuta dal sito TMDB
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }


  // Metodo per cercare film basati su una query
  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`);
  }

  // Metodo per scoprire film popolari
  discoverMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&page=${page}`);
  }

  // Metodo per ottenere film per genere
  getMoviesByGenre(genreId: number, page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}`);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }
  
}

