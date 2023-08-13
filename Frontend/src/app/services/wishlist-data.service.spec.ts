import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WishlistDataService } from './wishlist-data.service';

describe('WishlistDataService', () => {
  let service: WishlistDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(WishlistDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
