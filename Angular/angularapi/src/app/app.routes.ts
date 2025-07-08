import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { NotFound } from './layout/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'exams', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  //{ path: 'exams', loadChildren: () => import('./exams/exams.module').then(m => m.ExamsModule) },
  //{ path: 'results', loadChildren: () => import('./results/student-results').then(m => m.ResultsModule) },
  { path: '**', component: NotFound }
];

