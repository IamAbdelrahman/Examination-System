import { TestBed } from '@angular/core/testing';

import { Result } from './result';

describe('Result', () => {
  let service: Result;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Result);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
