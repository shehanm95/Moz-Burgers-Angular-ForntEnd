import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../../appState';
import { selectCartProducts } from '../../state/cartState/cart.selector';
import { IProduct } from '../../service/product-service.service';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { Observable, of } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products$: Observable<IProduct[]>
  products!: IProduct[];
  constructor(private store: Store<appState>) {
    this.products$ = this.store.select(selectCartProducts);
  }
}
