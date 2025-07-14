import { Component, inject, signal, OnInit } from '@angular/core';
import { StudentExamService, StudentExamListDto } from '../../../core/services/StudentServices/student-exam-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-exam-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student-exam-list.html',
  styleUrl: './student-exam-list.css'
})
export class StudentExamList implements OnInit {
  private examService = inject(StudentExamService);
  private router = inject(Router);

  exams = signal<StudentExamListDto[]>([]);
  currentPage = signal(1);
  pageSize = 10;
  loading = signal(false);
  error = signal('');
  searchTerm = signal('');
  searchInput = '';
  totalItems = signal(0);
  jumpToPageNumber = 1;

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

    this.examService.getAvailableExams(
      this.currentPage(),
      this.pageSize,
      this.searchTerm()
    ).subscribe({
      next: (exams: StudentExamListDto[]) => {
        this.exams.set(exams);
        this.loading.set(false);
      
        this.totalItems.set(exams.length === this.pageSize ? this.currentPage() * this.pageSize + 1 : (this.currentPage() - 1) * this.pageSize + exams.length);
      },
      error: (err: Error) => {
        this.error.set(err.message || 'Failed to load exams. Please try again later.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onPageSizeChange() {
    this.currentPage.set(1);
    this.loadExams();
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
      this.loadExams();
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.loadExams();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.currentPage.set(page);
      this.loadExams();
    }
  }

  jumpToPage() {
    const page = this.jumpToPageNumber;
    if (page >= 1 && page <= this.totalPages()) {
      this.goToPage(page);
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalItems() / this.pageSize);
  }

  getStartIndex(): number {
    return (this.currentPage() - 1) * this.pageSize + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage() * this.pageSize, this.totalItems());
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show current page and 2 pages on each side
      let start = Math.max(1, current - 2);
      let end = Math.min(totalPages, current + 2);

      // Adjust if we're near the beginning or end
      if (current <= 3) {
        end = Math.min(5, totalPages);
      }
      if (current >= totalPages - 2) {
        start = Math.max(1, totalPages - 4);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  startExam(examId: number) {
    console.log('Starting exam with ID:', examId);
    this.router.navigate(['/student/exam', examId]);
  }
}