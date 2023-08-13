import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {

  url = 'http://localhost:8082/api/v1.0/shopping/';

  constructor(private http: HttpClient) { }

  products() {
    return this.http.get(this.url + 'all');
  }

  getProductByName(productName: string) {
    return this.http.get(this.url + 'products/search/' + productName);
  }

  addProductService(product: Product) {

    const prodName = product.productName
    const newUrl = this.url + prodName + '/add';
    const token = localStorage.getItem('token')
    const header = new HttpHeaders({ Authorization: 'Bearer ' + token });
    const requestOptions = { headers: header };

    return (this.http.post(newUrl, product, requestOptions));
  }

  deleteProductService(productId: Number, productName: String) {
    const newUrl = this.url + productName + '/delete/' + productId;
    const token = localStorage.getItem('token')
    const header = new HttpHeaders({ Authorization: 'Bearer ' + token });
    const requestOptions = { headers: header };
    return (this.http.delete(newUrl, requestOptions));
  }

  updateProductService(product: Product, productId: Number) {
    const prodName = product.productName
    const newUrl = this.url + prodName + '/update/' + productId;
    const token = localStorage.getItem('token')
    const header = new HttpHeaders({ Authorization: 'Bearer ' + token });
    const requestOptions = { headers: header };
    return (this.http.put(newUrl, product, requestOptions));
  }
}
