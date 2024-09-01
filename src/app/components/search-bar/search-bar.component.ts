import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchQuery: string = '';
  selectedGenre: number | null = null;
  genres: any[] = [];

  @Output() moviesFound = new EventEmitter<any[]>();

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.tmdbService.getGenres().subscribe(
      (data) => {
        this.genres = data.genres;
      },
      (error) => {
        console.error('Errore nel recuperare i generi:', error);
      }
    );
  }

  onSearch(): void {
    if (this.searchQuery.length > 2 || this.selectedGenre) {
      this.tmdbService.searchMoviesByQueryAndGenre(this.searchQuery, this.selectedGenre).subscribe(
        (data) => {
          this.moviesFound.emit(data.results);
        },
        (error) => {
          console.error('Errore nella ricerca dei film:', error);
        }
      );
    }
  }
}

