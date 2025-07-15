import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExamService } from '../../../../core/services/exam-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.html',
  styleUrls: ['./update-exam.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class UpdateExamComponent implements OnInit {
  updateForm!: FormGroup;
  examId!: number;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('id'));
    this.buildForm();
    this.loadExamData();
  }

  buildForm(): void {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  loadExamData(): void {
    this.isLoading = true;
    this.examService.getExamById(this.examId).subscribe({
      next: (exam) => {
        this.updateForm.patchValue({
          title: exam.title,
          description: exam.description,
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load exam data';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.updateForm.invalid) return;

    const updatedExam = {
      id: this.examId,
      ...this.updateForm.value
    };

    this.isLoading = true;
    this.examService.updateExam(this.examId, updatedExam).subscribe({
      next: () => {
        this.successMessage = 'Exam updated successfully!';
        setTimeout(() => {
          this.router.navigate(['/exam']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = 'Failed to update exam.';
        this.isLoading = false;
      }
    });
  }


}
