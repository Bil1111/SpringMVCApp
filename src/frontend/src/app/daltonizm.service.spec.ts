import { TestBed } from '@angular/core/testing';

import { DaltonizmService } from './daltonizm.service';

describe('DaltonizmService', () => {
  let service: DaltonizmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaltonizmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
