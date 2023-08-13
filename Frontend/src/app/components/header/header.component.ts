import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartDataService } from 'src/app/services/cart-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartdata: any;
  isAdmin = false;
  isUser = false;
  userName:any;

  public totalItem: number = 0;

  search: String = '';

  constructor(
    private carts: CartDataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService : AuthService
  ) {
    if(localStorage.getItem('userName')!=null && !this.authService.isRoleAdmin() ){
      carts.getCartDataService().subscribe((data: any) => {
        this.totalItem = data.length;
        this.cartdata = data;
      });
    }

  }

  ngOnInit(): void {
    this.isUser = this.authService.isRoleUser();
    this.userName = this.authService.getUserName();
    this.isAdmin = this.authService.isRoleAdmin();

  }

  getValue(value: string) {
    this.search = value;
    this.router.navigate(['/search/' + this.search.search]);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.onSameUrlNavigation = 'reload';
  }

  Logout() {
    this.authService.userLogout();
    // this.router.navigate(['/login']);
  }
}
