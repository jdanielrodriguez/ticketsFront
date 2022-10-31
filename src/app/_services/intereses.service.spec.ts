import { TestBed } from '@angular/core/testing';

import { InteresesService } from './intereses.service';

describe('InteresesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteresesService = TestBed.get(InteresesService);
    expect(service).toBeTruthy();
  });
});
