import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsDataService } from 'src/app/services/products-data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productId: number = 0;
  isAddMode: boolean = true;
  productName: string = '';
  value = '';
  form = new FormGroup({
    productName: new FormControl(),
    productDescription: new FormControl(),
    price: new FormControl(),
    features: new FormControl(),
    quantity: new FormControl(),
    productStatus: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private addProduct: ProductsDataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      price: ['', Validators.required],
      features: ['', Validators.required],
      quantity: ['', Validators.required],
      productStatus: [{ value: null, disabled: true},Validators.required]
    });
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isAddMode = !params;
        this.productName = params['productName'];
        this.productId = params['id'];
      }
    })
    if (!this.isAddMode) {
      this.addProduct.getProductByName(this.productName).pipe(first()).subscribe((x: any) => {
        if (x.quantity <= 0) {
          x.productStatus = 'Out of stock'
        } else {
          x.productStatus = 'HURRY UP TO PURCHASE'
        }
        this.form.patchValue(x)

      });
    }
  }
  setProductStatusValue(value: any): void {
    if (value > 0) {
      this.form.patchValue({
        productStatus: 'HURRY UP TO PURCHASE'
      })
    } else if (value == null) {
      this.form.patchValue({
        productStatus: ''
      })
    } else if (value === 0) {
      this.form.patchValue({
        productStatus: 'Out of stock'
      })
    }
  }
  submit() {
    if (this.isAddMode) {
      this.addProduct.addProductService(this.form.getRawValue()).subscribe(
        (res: any) => {
          alert(res);
          this.router.navigate(['/products']);
        }, (error) => {
          alert("Something Went Wrong!!!!!")
        }
      )
    } else if (!this.isAddMode) {
      this.addProduct.updateProductService(this.form.getRawValue(),this.productId).subscribe(
        (res: any) => {
          alert(res);
          this.router.navigate(['/products']);
        }, (error: any) => {
          alert("Something Went Wrong!!!!!")

        }
      )

    }

  }

}
