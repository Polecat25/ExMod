import { TestBed } from '@angular/core/testing';

import { VigilantelogGuard } from './vigilantelog.guard';

describe('VigilantelogGuard', () => {
  let guard: VigilantelogGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VigilantelogGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
