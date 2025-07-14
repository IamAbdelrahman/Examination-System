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

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin-dashboard', 
    component: AdminDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'Student'}
  },
  {
    path: 'student-dashboard', 
    component: StudentDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'Student'}
  },
  { path: '', redirectTo: 'exam', pathMatch: 'full' },
  { path: 'exam', component: AllExamsComponent },
  { 
    path: 'exam/create', 
    component: CreateExam,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'Admin'}
   },
  { path: 'exam/details/:id', component: ExamDetails },
  { path: '**', component: NotFound }
];




// // export const routes: Routes = [

// //   { path: 'admin', component: AdminDashboard, canActivate: [AuthGuard, RoleGuard('Admin')] },
// //   { path: 'student', component: StudentDashboard, canActivate: [AuthGuard, RoleGuard('Student')] },
// //   { path: '**', redirectTo: 'login' }
// // ];


// import { Routes } from '@angular/router';
// import { NotFound } from '../app/Components/shared/not-found/not-found';
// import { AllExamsComponent } from './Components/admin/Exam/all-exams/all-exams';
// import { ExamDetails } from './Components/admin/Exam/exam-details/exam-details';
// import { CreateExam } from './Components/admin/Exam/create-exam/create-exam';

// export const routes: Routes = [
//   { path: '', redirectTo: 'exam', pathMatch: 'full' }, 
//   { path: 'exam', component: AllExamsComponent },
//     { path: 'exam/create', component: CreateExam },

//   { path: 'exam/details/:id', component: ExamDetails }, 
//   { path: '**', component: NotFound }
// ];