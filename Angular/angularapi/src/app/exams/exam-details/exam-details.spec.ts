import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetails } from './exam-details';

describe('ExamDetails', () => {
  let component: ExamDetails;
  let fixture: ComponentFixture<ExamDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
