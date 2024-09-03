import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-dettagli-film',
  templateUrl: './dettagli-film.component.html',
  styleUrl: './dettagli-film.component.css'
})
export class DettagliFilmComponent implements OnInit{

  movie: any;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tmdbService.getMovieDetails(Number(id)).subscribe(
        (data) => {
          this.movie = data;
          console.log('Dettagli del film:', this.movie);
        },
        (error) => {
          console.error('Errore durante il recupero dei dettagli del film:', error);
        }
      );
    }
  }
  getMoviePoster(path: string): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'path/to/fallback-image.jpg';
  }

  goBack(): void {
    this.location.back();
  }
  
}
