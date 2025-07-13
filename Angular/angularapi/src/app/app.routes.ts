
import { Routes } from '@angular/router';
import { NotFound } from '../app/Components/shared/not-found/not-found';
import { AllExamsComponent } from './Components/admin/Exam/all-exams/all-exams';

export const routes: Routes = [
{ path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'exam', component:AllExamsComponent  },


  { path: '**', component: NotFound }
];

