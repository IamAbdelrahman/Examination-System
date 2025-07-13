import { Component, inject, signal, OnInit } from '@angular/core';
import { ExamService } from '../../../../core/services/exam-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Exam {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-all-exams',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-exams.html',
  styleUrl: './all-exams.css'
})
export class AllExamsComponent implements OnInit {
  private examService = inject(ExamService);

  exams = signal<Exam[]>([]);
  currentPage = signal(1);
  pageSize = 10;
  loading = signal(false);
  error = signal('');
  searchTerm = signal('');
  searchInput = '';
  showDeleteModal = signal(false);
  examToDelete = signal<Exam | null>(null);

  ngOnInit() {
    this.loadExams();
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchInput = target.value;
  }

  search() {
    this.searchTerm.set(this.searchInput.trim());
    this.currentPage.set(1);
    this.loadExams();
  }

  clearSearch() {
    this.searchTerm.set('');
    this.searchInput = '';
    this.currentPage.set(1);
    this.loadExams();
  }

  loadExams() {
    this.loading.set(true);
    this.error.set('');

    const observable = this.searchTerm() 
      ? this.examService.searchExams(this.searchTerm(), this.currentPage(), this.pageSize)
      : this.examService.getAllExams(this.currentPage(), this.pageSize);

    observable.subscribe({
      next: (exams: Exam[]) => {
        this.exams.set(exams);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message || 'Failed to load exams. Please try again later.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  nextPage() {
    this.currentPage.update(p => p + 1);
    this.loadExams();
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.loadExams();
    }
  }

  deleteExam(id: number) {
    const exam = this.exams().find(e => e.id === id);
    if (exam) {
      this.examToDelete.set(exam);
      this.showDeleteModal.set(true);
    }
  }

  cancelDelete() {
    this.showDeleteModal.set(false);
    this.examToDelete.set(null);
  }

  confirmDelete() {
    const exam = this.examToDelete();
    if (exam) {
      this.loading.set(true);
      this.examService.deleteExam(exam.id).subscribe({
        next: () => {
          this.exams.update(exams => exams.filter(e => e.id !== exam.id));
          this.loading.set(false);
          this.showDeleteModal.set(false);
          this.examToDelete.set(null);
        },
        error: (err: Error) => {
          this.error.set(err.message || 'Failed to delete exam');
          this.loading.set(false);
          this.showDeleteModal.set(false);
          this.examToDelete.set(null);
        }
      });
    }
  }

  addExam() {
    // TODO: Navigate to add exam page
    console.log('Navigate to add exam page');
    // Example: this.router.navigate(['/exams/add']);
  }

  viewDetails(examId: number) {
    // TODO: Navigate to exam details page
    console.log('Navigate to exam details page for ID:', examId);
    // Example: this.router.navigate(['/exams', examId]);
  }
}