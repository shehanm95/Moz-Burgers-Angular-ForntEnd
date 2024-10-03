import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../../appState';
import { selectCartProducts } from '../../state/cartState/cart.selector';
import { IProduct } from '../../service/product-service.service';
import { AsyncPipe, CommonModule, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { Observable, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { addToCart, removeFromCart } from '../../state/cartState/cart.action';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, AsyncPipe, JsonPipe, RouterLink, NgTemplateOutlet],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products$: Observable<IProduct[]>;
  length: number = 0;
  constructor(private store: Store<appState>) {
    this.products$ = this.store.select(selectCartProducts);
    this.products$.subscribe(products => {
      this.length = products.length;
    });
  }

  makeQuantityChange($event: Event, product: IProduct) {
    this.store.dispatch(addToCart({ product }));
  }

  removeProduct(product: IProduct) {

    this.store.dispatch(removeFromCart({ product }));
  }
  @Input() product!: IProduct;
}
