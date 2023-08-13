import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cartData } from '../model/cartData.model';

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  url = 'http://localhost:8082/api/v1.0/shopping/';


  constructor(private http: HttpClient) { }

  getCartDataService() {
    const logId = localStorage.getItem('userName');
    const newUrl = this.url + 'getCart/' + logId
    const token = localStorage.getItem('token')
    const header = new HttpHeaders({ Authorization: 'Bearer ' + token });
    const requestOptions = { headers: header };
    return this.http.get(newUrl, requestOptions);
  }

  addCartDataService(cart: cartData) {
    const newUrl = this.url + 'addToCart';
    const token = localStorage.getItem('token')
    const header = new HttpHeaders({ Authorization: 'Bearer ' + token });
    const requestOptions = { headers: header };
    return this.http.post(newUrl, cart, requestOptions);
  }

  deleteCartDataService(productName: String) {
    const newUrl = this.url + 'removeProductFromCart/' + productName;
    const token = localStorage.getItem('token')
    const header = new HttpHeaders({ Authorization: 'Bearer ' + token });
    const requestOptions = { headers: header };
    return this.http.delete(newUrl, requestOptions);

  }

}
