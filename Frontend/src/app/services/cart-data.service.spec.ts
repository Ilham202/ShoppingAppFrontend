import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CartDataService } from './cart-data.service';

describe('CartDataService', () => {
  let service: CartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
