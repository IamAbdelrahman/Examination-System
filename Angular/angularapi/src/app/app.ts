
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFound } from '../app/Components/shared/not-found/not-found';
import { Header } from '../app/Components/shared/header/header';
import { AllExamsComponent } from "./Components/admin/Exam/all-exams/all-exams";
import { CreateExam } from "./Components/admin/Exam/create-exam/create-exam";
import { ExamTaking } from "./Components/student/exam-taking/exam-taking";
import { UpdateExamComponent } from "./Components/admin/Exam/update-exam/update-exam";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterModule, Header, ExamTaking, UpdateExamComponent], 
  standalone: true
})
export class App {
  protected title = 'angularapi';
    refreshOnceAfter(delay:number) {
    setTimeout(function() {
        window.location.reload();
    }, delay);
}
}

