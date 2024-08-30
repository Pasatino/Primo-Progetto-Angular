import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lista-film',
  templateUrl: './lista-film.component.html',
  styleUrl: './lista-film.component.css'
})
export class ListaFilmComponent {

  @Input() movies: any[] = [];

  getMoviePoster(path: string): string {

    return `https://image.tmdb.org/t/p/w500${path}`;
    
    }
}
