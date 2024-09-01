import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaFilmComponent } from './components/lista-film/lista-film.component';
import { DettagliFilmComponent } from './components/dettagli-film/dettagli-film.component';

const routes: Routes = [
  { path: '', component: ListaFilmComponent },
  { path: 'movie/:id', component: DettagliFilmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
