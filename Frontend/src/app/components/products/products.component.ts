import { Component, Input, OnInit, Provider } from '@angular/core';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/model/product.model';
import { CartDataService } from 'src/app/services/cart-data.service';
import { WishlistDataService } from 'src/app/services/wishlist-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  products: any;
  errorMs: any = [];
  jsonData: any;
  isAdmin = false;
  isUser = false;
  userName: any;
  errors: any;
  updateRequired: boolean = false;
  constructor(
    private productData: ProductsDataService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cartService: CartDataService,
    private wishListService : WishlistDataService
  ) {
    productData.products().subscribe((data: any) => {
      console.log('products', data);
      this.products = data;
      this.http.get('./assets/productsData.json').subscribe((datas) => {
        this.jsonData = datas;
        this.products = this.getProductsWithImages(this.products, this.jsonData);
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].quantity > 0 && this.products[i].productStatus === 'Out of stock') {
            this.products[i].updateRequired = true;
          }
          if (this.products[i].quantity === 0 && this.products[i].productStatus === 'HURRY UP TO PURCHASE') {
            this.products[i].updateRequired = true;
          }
          if (this.products[i].quantity === 0) {
            this.errorMs.push(this.products[i].id);
          }
          if (!this.products[i].imageUrl) {
            this.products[i].imageUrl = 'assets/ProductsImages/no-image.png'
          }
        }
      });
    },
      (error) => {
        this.errors = error.error.message

      });
  }

  errorHandle(error: HttpErrorResponse) {
    console.log('==========', error);
    return throwError(error.error.message || 'Server Error');
  }

  form = new FormGroup({});

  wishform = new FormGroup({});

  ngOnInit(): void {
    this.isUser = this.authService.isRoleUser();
    this.userName = this.authService.getUserName();
    this.isAdmin = this.authService.isRoleAdmin();
  }

  addtoCart(data: any) {
    this.form = this.formBuilder.group({
      loginId: localStorage.getItem('userName'),
      product_id: data.productId,
      productName: data.productName,
      zipCode: data.zipcode,
      quantity: data.quantity,
    });
    this.cartService.addCartDataService(this.form.getRawValue()).subscribe(
      (res: any) => {
        alert(res);
        this.router.navigate(['/cart']);
      },
      (error) => {
        alert(error);
      }
    )
  }

  wishData(data: any) {
    this.wishform = this.formBuilder.group({
      loginId: localStorage.getItem('userName'),
      product_id: data.productId,
      productName: data.productName,
      quantity: data.quantity,
    });
    console.log(this.wishform);
    this.wishListService.addToWishList(this.wishform.getRawValue())
      .subscribe((res: any) => {
        this.router.navigate(['/wishlist']);
        alert(res);
      });
  }
  getProductsWithImages(prod: any, js: any) {
    prod.filter((o1: any) => {
      js.some((o2: any) => {
        if (o1.productName === o2.name) {
          o1.imageUrl = o2.imgUrl
        }
      })
    })
    return prod;
  }
  clickWishModel() {
    if (!this.isUser) {
      this.errors = "Please Login to Proceed !!";
      setTimeout(() => {
        this.errors = null;
      }, 4000);
    }
  }
  deleteClick(productId: number, productName: string) {
    if (confirm("Are you sure to delete '" + productName + "'")) {
      this.productData.deleteProductService(productId, productName).subscribe(
        (data) => {
          alert(data);
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/products']);
        })
    }
  }
  updateClick(product: Product) {
    this.router.navigate(['/addProduct'], {
      queryParams: product
    });
  }

}
