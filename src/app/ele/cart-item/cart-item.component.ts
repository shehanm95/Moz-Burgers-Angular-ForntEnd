import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../service/product-service.service';
import { Store } from '@ngrx/store';
import { appState } from '../../appState';
import { removeFromCart } from '../../state/cartState/cart.action';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  constructor(private store: Store<appState>) { }



}
