

// export const routes: Routes = [
//   { path: '', redirectTo: 'Home', pathMatch: 'full' },
//   { path: 'login', component: Login },
//   { path: 'register', component: Register },
  
//   // { path: 'exams', loadChildren: () => import('./exams/exams.module').then(m => m.ExamsModule) },
//   // { path: 'results', loadChildren: () => import('./results/student-results').then(m => m.ResultsModule) },

//   // { path: 'exams', loadChildren: () => import('./exams/exams.module').then(m => m.ExamsModule) },
//   // { path: 'results', loadChildren: () => import('./results/student-results').then(m => m.ResultsModule) },

//   //{ path: 'exams', loadChildren: () => import('./exams/exams.module').then(m => m.ExamsModule) },
//   //{ path: 'results', loadChildren: () => import('./results/student-results').then(m => m.ResultsModule) },

//   { path: '**', component: NotFound }
// ];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login } from './modules/auth/login/login';
import { Register } from './modules/auth/register/register';
import { NotFound } from './modules/shared/components/not-found/not-found';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', component: NotFound } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// app.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- <app-login></app-login>
    <app-register></app-register> -->
  `,
  styleUrls: ['./app.css'],
  imports: [Login]
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  
  constructor() { }

  ngOnInit() {
  }
}