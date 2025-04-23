import { TestBed } from '@angular/core/testing';

import { ReportespostService } from './reportespost.service';

describe('ReportespostService', () => {
  let service: ReportespostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportespostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
