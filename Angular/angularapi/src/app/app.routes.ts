
import { Routes } from '@angular/router';
import { NotFound } from '../app/Components/shared/not-found/not-found';

export const routes: Routes = [
{ path: '', redirectTo: 'Home', pathMatch: 'full' },
  


  { path: '**', component: NotFound }
];

