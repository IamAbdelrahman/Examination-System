import { Component, inject, signal } from '@angular/core';
import { CreateExamService, CreateExamDto } from '../../../../core/services/create-exam';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface ExamFormValue {
  title: string;
  description: string;
  questions: QuestionFormValue[];
}

interface QuestionFormValue {
  text: string;
  options: OptionFormValue[];
}

interface OptionFormValue {
  text: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-update-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-exam.html',
  styleUrl: './update-exam.css'
})
export class CreateExam {
  private fb = inject(FormBuilder);
  private createExamService = inject(CreateExamService);
  private router = inject(Router);

  examForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    questions: this.fb.array<FormGroup>([])
  });

  loading = signal(false);
  error = signal('');
  success = signal(false);
  submitted = false;

  get questions(): FormArray {
    return this.examForm.get('questions') as FormArray;
  }

  getQuestionOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  ngOnInit(): void {
    this.addQuestion();
  }

  addQuestion(): void {
    const questionGroup = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      options: this.fb.array([
        this.createOption('', true),
        this.createOption('', false)
      ], [Validators.required, Validators.minLength(2)])
    });
    this.questions.push(questionGroup);
  }

  removeQuestion(index: number): void {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    }
  }

  addOption(questionIndex: number): void {
    this.getQuestionOptions(questionIndex).push(this.createOption('', false));
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const options = this.getQuestionOptions(questionIndex);
    if (options.length > 2) {
      options.removeAt(optionIndex);
      // If we removed the correct answer, set the first option as correct
      if (this.getCorrectAnswerCount(questionIndex) === 0) {
        this.setCorrectAnswer(questionIndex, 0);
      }
    }
  }

  createOption(text: string, isCorrect: boolean): FormGroup {
    return this.fb.group({
      text: [text, Validators.required],
      isCorrect: [isCorrect]
    });
  }

  setCorrectAnswer(questionIndex: number, optionIndex: number): void {
    const optionsArray = this.getQuestionOptions(questionIndex);
    optionsArray.controls.forEach((option, index) => {
      option.get('isCorrect')?.setValue(index === optionIndex);
    });
  }

  getCorrectAnswerCount(questionIndex: number): number {
    const options = this.getQuestionOptions(questionIndex).value;
    return options.filter((o: OptionFormValue) => o.isCorrect).length;
  }

  isQuestionInvalid(questionIndex: number): boolean {
    const question = this.questions.at(questionIndex);
    const options = this.getQuestionOptions(questionIndex);
    
    return question.invalid || 
           options.invalid || 
           this.getCorrectAnswerCount(questionIndex) !== 1;
  }

  /**
   * Convert index to letter (A, B, C, D, etc.)
   */
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 is ASCII for 'A'
  }

  onSubmit(): void {
    this.submitted = true;
    this.error.set('');
    this.success.set(false);

    if (this.examForm.invalid) {
      this.markAllAsTouched();
      this.error.set('Please fix all validation errors before submitting.');
      return;
    }

    const formValue = this.examForm.value as ExamFormValue;
    const examData: CreateExamDto = {
      title: formValue.title,
      description: formValue.description || '',
      questions: formValue.questions.map(q => ({
        text: q.text,
        options: q.options.map(o => ({
          text: o.text,
          isCorrect: o.isCorrect
        }))
      }))
    };

    this.loading.set(true);

    this.createExamService.createExam(examData).subscribe({
      next: (exam) => {
        this.loading.set(false);
        this.success.set(true);
        setTimeout(() => {
          this.router.navigate(['/exam/details', exam.id]);
        }, 2000);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  private markAllAsTouched(): void {
    this.examForm.markAllAsTouched();
    this.questions.controls.forEach(question => {
      question.markAllAsTouched();
      const options = (question as FormGroup).get('options') as FormArray;
      options.controls.forEach(option => option.markAllAsTouched());
    });
  }

  cancel(): void {
    this.router.navigate(['/exam']);
  }
}