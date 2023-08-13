import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WishListData } from '../model/wishListData.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistDataService {
  userid = localStorage.getItem('customerId');
  url = 'http://localhost:8082/api/v1.0/shopping/';


  constructor(private http: HttpClient) { }

  wishlistdata() {
    const logId = localStorage.getItem('userName');
    const newUrl = this.url + 'getWishList/' + logId
    const token = localStorage.getItem('token')
    const header = new HttpHeaders({ Authorization: 'Bearer ' + token });
    const requestOptions = { headers: header };
    return this.http.get(newUrl, requestOptions);
  }

  addToWishList(wishListData:WishListData){
    const newUrl = this.url + 'addToWishList';
    const token = localStorage.getItem('token')
    const header = new HttpHeaders({ Authorization: 'Bearer ' + token });
    const requestOptions = { headers: header };
    return this.http.post(newUrl, wishListData, requestOptions);
  }

  deleteWishListDataService(productName: String) {
    const newUrl = this.url + 'removeProductFromWishList/' + productName;
    const token = localStorage.getItem('token')
    const header = new HttpHeaders({ Authorization: 'Bearer ' + token });
    const requestOptions = { headers: header };
    return this.http.delete(newUrl, requestOptions);

  }
}
