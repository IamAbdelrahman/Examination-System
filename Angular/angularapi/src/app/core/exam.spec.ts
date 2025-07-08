import { TestBed } from '@angular/core/testing';

import { Exam } from './exam';

describe('Exam', () => {
  let service: Exam;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Exam);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
