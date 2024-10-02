import { Component, inject, OnInit } from '@angular/core';
import { IProduct, ProductServiceService } from '../../service/product-service.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { ProductComponent } from "../product/product.component";
import { Store } from '@ngrx/store';
import { addToCart } from '../../state/cartState/cart.action';
import { selectCartProducts } from '../../state/cartState/cart.selector';
import { appState } from '../../appState';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, ProductComponent, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {

  constructor(private store: Store<{ cart: IProduct[] }>, private appState: Store<appState>) {

  }
  addToCart(product: IProduct) {
    this.store.dispatch(addToCart({ product }));
    const products = this.appState.select(selectCartProducts);
    console.log(this.appState.select(selectCartProducts))
  }

  productService = inject(ProductServiceService);
  products!: Observable<IProduct[]>;

  ngOnInit(): void {
    this.products! = this.productService.getProducts();
  }

}
