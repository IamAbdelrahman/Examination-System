import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
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
      questions: this.fb.array([])
    });
  }

get questions(): FormArray {
  return this.updateForm.get('questions') as FormArray;
}


addQuestion(question?: any): void {
  const questionGroup = this.fb.group({
    id: [question?.id || null], // Add ID for existing questions
    text: [question?.text || '', Validators.required],
    options: this.fb.array([])
  });

  if (question?.options?.length) {
    question.options.forEach((opt: any) => {
      (questionGroup.get('options') as FormArray).push(
        this.fb.group({
          id: [opt.id || null], // Add ID for existing options
          text: [opt.text, Validators.required],
          isCorrect: [opt.isCorrect || false]
        })
      );
    });
  } else {
    // Add two empty options by default for new questions
    const optionsArray = questionGroup.get('options') as FormArray;
    optionsArray.push(this.fb.group({ id: [null], text: '', isCorrect: false }));
    optionsArray.push(this.fb.group({ id: [null], text: '', isCorrect: false }));
  }

  this.questions.push(questionGroup);
}

getOptions(questionIndex: number): FormArray {
  return this.questions.at(questionIndex).get('options') as FormArray;
}


  addOption(questionIndex: number): void {
    const options = (this.questions.at(questionIndex).get('options') as FormArray);
    options.push(this.fb.group({ text: '', isCorrect: false }));
  }

loadExamData(): void {
  this.isLoading = true;
  this.examService.getExamById(this.examId).subscribe({
    next: (exam) => {
      this.updateForm.patchValue({
        title: exam.title,
        description: exam.description
      });

      const questionsArray = this.questions;
      exam.questions.forEach((question: any) => {
        questionsArray.push(this.fb.group({
          text: [question.text, Validators.required],
          options: this.fb.array(
            question.options.map((opt: any) =>
              this.fb.group({
                text: [opt.text, Validators.required],
                isCorrect: [opt.isCorrect]
              })
            )
          )
        }));
      });

      this.isLoading = false;
    },
    error: () => {
      this.errorMessage = 'Failed to load exam data';
      this.isLoading = false;
    }
  });
}



onSubmit(): void {
  if (this.updateForm.invalid) {
    // Optional: Mark all fields as touched to show validation errors
    this.updateForm.markAllAsTouched();
    return;
  }

  const updatedExam = {
    // id: this.examId, // Not needed here as it's in the route parameter
    ...this.updateForm.value
  };

  this.isLoading = true;
  this.examService.updateExam(this.examId, updatedExam).subscribe({ // Pass this.examId from the route
    next: () => {
      this.successMessage = 'Exam updated successfully!';
      setTimeout(() => {
        this.router.navigate(['/exam']);
      }, 1500);
    },
    error: (err) => { // Capture error details
      this.errorMessage = 'Failed to update exam: ' + (err.error || 'Unknown error');
      this.isLoading = false;
    }
  });
}

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const options = (this.questions.at(questionIndex).get('options') as FormArray);
    options.removeAt(optionIndex);
  }
}
