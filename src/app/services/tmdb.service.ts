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


  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}`);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`);
  }
}

  