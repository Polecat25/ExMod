import { TestBed } from '@angular/core/testing';

import { ServicioMultiService } from './servicio-multi.service';

describe('ServicioMultiService', () => {
  let service: ServicioMultiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioMultiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
