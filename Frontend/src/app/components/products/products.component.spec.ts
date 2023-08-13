import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Product } from 'src/app/model/product.model';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ ProductsComponent ],
      providers : [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate',()=>{
    const product : Product = {
    productName: 'Jeans',
    productDescription: 'Slim-fit',
    price: 700,
    features: 'sizes - 30 and 32',
    quantity: 4,
    productStatus: 'HURRY UP TO PURCHASE'
    };
    spyOn(router,'navigate');
    component.updateClick(product);
    expect(router.navigate).toHaveBeenCalledWith(['/addProduct'],{queryParams:product});
  })

  it('should set error',()=>{
     component.isUser = false;
     component.clickWishModel();
     expect(component.errors).toBe('Please Login to Proceed !!');
  });
});
