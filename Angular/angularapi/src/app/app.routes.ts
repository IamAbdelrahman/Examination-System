import { Routes } from '@angular/router';
import { NotFound } from '../app/Components/shared/not-found/not-found';
import { AllExamsComponent } from './Components/admin/Exam/all-exams/all-exams';
import { ExamDetails } from './Components/admin/Exam/exam-details/exam-details';
import { CreateExam } from './Components/admin/Exam/create-exam/create-exam';

export const routes: Routes = [
  { path: '', redirectTo: 'exam', pathMatch: 'full' }, 
  { path: 'exam', component: AllExamsComponent },
    { path: 'exam/create', component: CreateExam },

  { path: 'exam/details/:id', component: ExamDetails }, 
  { path: '**', component: NotFound }
];