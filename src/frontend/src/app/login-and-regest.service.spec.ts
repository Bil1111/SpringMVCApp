import { TestBed } from '@angular/core/testing';

import { LoginAndRegestService } from './login-and-regest.service';

describe('LoginAndRegestService', () => {
  let service: LoginAndRegestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAndRegestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
