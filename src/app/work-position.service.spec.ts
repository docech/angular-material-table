import { TestBed } from '@angular/core/testing';

import { WorkPositionServiceService } from './work-position.service';

describe('WorkPositionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkPositionServiceService = TestBed.get(WorkPositionServiceService);
    expect(service).toBeTruthy();
  });
});
