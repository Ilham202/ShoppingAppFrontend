import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { SearchComponent } from './components/search/search.component';
import { StarRatingModule } from 'angular-star-rating';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LandingComponent } from './components/landing/landing.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SignupComponent,
    CartComponent,
    HeaderComponent,
    WishlistComponent,
    FooterComponent,
    SearchComponent,
    ChangePassComponent,
    AddProductComponent,
    LandingComponent,
    ThankYouComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StarRatingModule.forRoot(),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
