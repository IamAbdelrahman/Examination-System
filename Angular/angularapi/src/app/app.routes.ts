import { Routes } from '@angular/router';
import { Login } from './modules/auth/login/login';
import { Register } from './modules/auth/register/register';
import { NotFound } from './modules/shared/components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'exams', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // { path: 'exams', loadChildren: () => import('./exams/exams.module').then(m => m.ExamsModule) },
  // { path: 'results', loadChildren: () => import('./results/student-results').then(m => m.ResultsModule) },

  // { path: 'exams', loadChildren: () => import('./exams/exams.module').then(m => m.ExamsModule) },
  // { path: 'results', loadChildren: () => import('./results/student-results').then(m => m.ResultsModule) },

  //{ path: 'exams', loadChildren: () => import('./exams/exams.module').then(m => m.ExamsModule) },
  //{ path: 'results', loadChildren: () => import('./results/student-results').then(m => m.ResultsModule) },

  { path: '**', component: NotFound }
];

