import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductServiceService {




  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    const apiUrl = productBaseUrl + '/all';

    return this.http.get<IProduct[]>(apiUrl).pipe(
      map(products => products.map(product => ({
        ...product, // Copy all the existing properties of the product
        cartQuantity: 0  // Add or override the cartQuantity property to 0
      })))
    );
  }

  getProductById(productId: string): Observable<IProduct> {
    const apiUrl = productBaseUrl + '/get/' + productId;
    return this.http.get<IProduct>(apiUrl);

  }
}


export const getProductCategories = [
  { id: 1, name: 'Burger' },
  { id: 2, name: 'Beverages' },
  { id: 3, name: 'Chicken' }
];


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
