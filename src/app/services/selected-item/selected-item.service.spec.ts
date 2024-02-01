import { TestBed } from '@angular/core/testing';

import { SelectedItemService } from './selected-item.service';

describe('SelectedItemService', () => {
  let service: SelectedItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
