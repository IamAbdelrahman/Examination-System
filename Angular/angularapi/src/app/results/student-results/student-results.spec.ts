import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResults } from './student-results';

describe('StudentResults', () => {
  let component: StudentResults;
  let fixture: ComponentFixture<StudentResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentResults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentResults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
