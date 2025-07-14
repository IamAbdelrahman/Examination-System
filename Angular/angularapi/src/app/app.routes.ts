import { Routes } from '@angular/router';
import { NotFound } from '../app/Components/shared/not-found/not-found';
import { AllExamsComponent } from './Components/admin/Exam/all-exams/all-exams';
import { ExamDetails } from './Components/admin/Exam/exam-details/exam-details';
import { CreateExam } from './Components/admin/Exam/create-exam/create-exam';
import { AuthGuard } from './core/guards/auth.guards';
import { RoleGuard } from './core/guards/role.guard';
import { LoginComponent } from './Components/auth/login/login';
import { RegisterComponent} from './Components/auth/register/register';
import { AdminDashboard } from './Components/admin/admin-dashboard/admin-dashboard';
import { StudentDashboard} from './Components/student/student-dashboard/student-dashboard';
import { StudentExamList } from './Components/student/student-exam-list/student-exam-list';
import { ExamTaking } from './Components/student/exam-taking/exam-taking';
import { StudentResults } from './Components/student/student-restults/student-restults';
import { ResultDetails } from './Components/student/result-details/result-details';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin-dashboard', 
    component: AdminDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },
   { path: 'student/exams', component:StudentExamList },
    { path: 'student/results', component:StudentResults},
   { path: 'student/result/:id', component:ResultDetails},
  {
    path: 'student-dashboard', 
    component: StudentDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Student' }
  },
  { path: 'exam', component: AllExamsComponent },
    { path: 'student/exam/:id', component:ExamTaking },

  { 
    path: 'exam/create', 
    component: CreateExam,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },
  { path: 'exam/details/:id', component: ExamDetails },
  { path: '**', component: NotFound }
];

