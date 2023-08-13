import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { SignupComponent } from './components/signup/signup.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchComponent } from './components/search/search.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LandingComponent } from './components/landing/landing.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forgot',
    component: ChangePassComponent,
  },
  {
    path: 'addProduct',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'thankyou',
    component: ThankYouComponent,
  },
  {
    path: 'search/:searchTerm',
    component: SearchComponent
  },
  { path: '**', component : LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  LoginComponent,
  ProductsComponent,
  SignupComponent,
  CartComponent,
  WishlistComponent,
  ChangePassComponent,
  ThankYouComponent
];
