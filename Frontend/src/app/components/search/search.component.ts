import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartDataService } from 'src/app/services/cart-data.service';
import { WishlistDataService } from 'src/app/services/wishlist-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  routeparam: any;
  product: any;
  products: any;
  productsdesc: any = [];
  errorMs: any = [];
  search: String = '';
  isAdmin = false;
  isUser = false;
  userName: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private productData: ProductsDataService,
    private router: Router,
    private cartService: CartDataService,
    private authService: AuthService,
    private wishListService: WishlistDataService
  ) {
    productData.products().subscribe((data: any) => {
      console.log('Data_____', data);
      this.products = data;
    });
  }

  errorHandle(error: HttpErrorResponse) {
    console.log('==========', error);
    return throwError(error.error.message || 'Server Error');
  }

  form = new FormGroup({});

  wishform = new FormGroup({});

  wishData(data: any) {
    this.wishform = this.formBuilder.group({
      loginId: localStorage.getItem('userName'),
      product_id: data.productId,
      productName: data.productName,
      quantity: data.quantity,
    });
    console.log(this.wishform.getRawValue());
    this.wishListService.addToWishList(this.wishform.getRawValue())
      .subscribe((res: any) => {
        this.router.navigate(['/wishlist']);
        alert(res);
      });
  }


  url = '';
  ngOnInit() {
    this.isUser = this.authService.isRoleUser();
    this.userName = this.authService.getUserName();
    this.isAdmin = this.authService.isRoleAdmin();
    // subscribe to router event
    this.route.params.subscribe((params: any) => {
      this.routeparam =
        params.searchTerm.charAt(0).toUpperCase() +
        params.searchTerm.substr(1).toLowerCase();
    });
    this.url = 'http://localhost:8082/api/v1.0/shopping/products/search/'

    this.http.get(this.url + this.routeparam).subscribe((data: any) => {
      this.http.get('./assets/productsData.json').subscribe((datas: any) => {
        for (let i = 0; i < datas.length; i++) {
          if (datas[i].name === data.productName) {
            data.imageUrl = datas[i].imgUrl
          }
        }
      });
      if (data.quantity === 0) {
        this.errorMs.push(data.id);
      }
      if (!data.imageUrl) {
        data.imageUrl = 'assets/ProductsImages/no-image.png'
      }


      let dataToArray = data.features
        .split(',')
        .map((item: string) => item.trim());

      this.productsdesc = dataToArray;
      console.log(this.productsdesc);
      this.product = data;
    });
  }

  getData(data: any) {
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
}
