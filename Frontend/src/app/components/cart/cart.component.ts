import { Component, OnInit } from '@angular/core';
import { ClickEvent, RatingChangeEvent } from 'angular-star-rating';
import { CartDataService } from 'src/app/services/cart-data.service';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartdata: any;
  jsonData: any;
  deliveryCharge = 100;


  public totalItem: number = 0;

  public grandTotal!: number;

  public subTotal!: number;

  search: String = '';

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartdata.map((a: any) => {
      grandTotal += a.product.price * a.quantity;
    });
    return grandTotal;
  }

  getSubPrice(): number {
    let subTotal = 0;
    this.cartdata.map((a: any) => {
      subTotal += this.deliveryCharge;
    });
    return subTotal;
  }

  constructor(
    private carts: CartDataService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    carts.getCartDataService().subscribe((data: any) => {
      console.log(data);
      this.totalItem = data.length;
      this.cartdata = data;
      this.grandTotal = this.getTotalPrice();
      this.subTotal = this.getSubPrice();
      this.http.get('./assets/productsData.json').subscribe((datas) => {
        this.jsonData = datas;
        this.cartdata = this.getProductsWithImages(this.cartdata, this.jsonData);
        console.log(this.cartdata);
      });
    });
  }



  deletebtn(data: any) {
    console.log('DELETE ID', data);
    if (confirm("Are you sure to delete '" + data + "' from Cart")) {
      this.carts.deleteCartDataService(data)
        .subscribe((res: any) => {
          console.log(res);
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/cart']);
        });

    }

  }
  getProductsWithImages(prod: any, js: any) {
    prod.filter((o1: any) => {
      js.some((o2: any) => {
        if (o1.product.productName === o2.name) {
          o1.product.imageUrl = o2.imgUrl
        }
      })
    })
    return prod;
  }
  thanks():void{
    setTimeout(() => {
      this.router.navigate(['/thankyou']);
    }, 3000);
  }

  ngOnInit(): void {
  }
}
