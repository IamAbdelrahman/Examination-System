import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamList } from './exam-list';

describe('ExamList', () => {
  let component: ExamList;
  let fixture: ComponentFixture<ExamList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
