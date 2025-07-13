import { Routes } from '@angular/router';
import { NotFound } from '../app/Components/shared/not-found/not-found';
import { AllExamsComponent } from './Components/admin/Exam/all-exams/all-exams';
import { ExamDetails } from './Components/admin/Exam/exam-details/exam-details';

export const routes: Routes = [
  { path: '', redirectTo: 'exam', pathMatch: 'full' }, // Changed from 'Home' to 'exam'
  { path: 'exam', component: AllExamsComponent },
  { path: 'exam/details/:id', component: ExamDetails }, // Changed to match 'exam' base path
  { path: '**', component: NotFound }
];