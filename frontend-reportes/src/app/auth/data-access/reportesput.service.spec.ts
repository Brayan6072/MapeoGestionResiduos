import { TestBed } from '@angular/core/testing';

import { ReportesputService } from './reportesput.service';

describe('ReportesputService', () => {
  let service: ReportesputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
