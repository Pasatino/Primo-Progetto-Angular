import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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
  getGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  searchMoviesByQueryAndGenre(query: string, genreId: number | null, page: number = 1): Observable<any> {
    if (query) {
      // Effettua la ricerca per parola chiave
      return this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`).pipe(
        map((data: any) => {
          // Se un genere è selezionato, filtra i risultati per genere
          if (genreId) {
            data.results = data.results.filter((movie: any) => movie.genre_ids.includes(genreId));
          }
          return data;
        })
      );
    } else if (genreId) {
      // Se non c'è query ma solo genere, usa 'discover/movie'
      return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}`);
    } else {
      // Se non c'è né query né genere, ritorna i film popolari
      return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&page=${page}`);
    }
  }
  
  
  
  
}

