

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
import { Home } from './home/home';
import { Component, OnInit } from '@angular/core';
import { Login } from './Components/auth/login/login';
import { Register } from './Components/auth/register/register';
import { NotFound } from './Components/shared/not-found/not-found';

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

@Component({
  selector: 'app-root',
  template: `
    <!-- <app-login></app-login>
    <app-register></app-register> -->
  `,
  styleUrls: ['./app.css'],
  imports: []
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  
  constructor() { }

  ngOnInit() {
  }
}