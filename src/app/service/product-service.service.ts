import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductServiceService {




  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    const apiUrl = productBaseUrl + '/all';
    return this.http.get<IProduct[]>(apiUrl);
  }

  getProductById(productId: string): Observable<IProduct> {
    const apiUrl = productBaseUrl + '/get/' + productId;
    return this.http.get<IProduct>(apiUrl);

  }
}


export const productBaseUrl: string = "http://localhost:8080/product";
export interface IProduct {
  id: number,
  name: string,
  quantity: number,
  price: number
  cartQuantity: number,
  description: string,
  category: string,
  imagePath: string
}
