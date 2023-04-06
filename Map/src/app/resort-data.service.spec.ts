import { TestBed } from '@angular/core/testing';

import { ResortDataService } from './resort-data.service';

describe('ResortDataService', () => {
  let service: ResortDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResortDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
