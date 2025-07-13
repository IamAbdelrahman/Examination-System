
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFound } from '../app/Components/shared/not-found/not-found';
import { Header } from '../app/Components/shared/header/header';
import { AllExamsComponent } from "./Components/admin/Exam/all-exams/all-exams";



@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterModule, Header], 
})
export class App {
  protected title = 'angularapi';
}


