import { TestBed } from '@angular/core/testing';

import { MuteService } from './mute-service';

describe('MuteService', () => {
  let service: MuteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
