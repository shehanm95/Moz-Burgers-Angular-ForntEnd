import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../../appState';
import { selectCartProducts } from '../../state/cartState/cart.selector';
import { IProduct } from '../../service/product-service.service';
import { AsyncPipe, CommonModule, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { Observable, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { addToCart, decrementToCart, removeFromCart } from '../../state/cartState/cart.action';
import { trigger } from '@angular/animations';
import { SetCartCustomerComponent } from "../../cust/set-cart-customer/set-cart-customer.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, AsyncPipe, JsonPipe, RouterLink, NgTemplateOutlet, SetCartCustomerComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  print() {
    print()
  }

  products$: Observable<IProduct[]>;
  length: number = 0;
  quantityInput?: number;
  cardQ: number = 10;
  disableAddButton: boolean = false;
  constructor(private store: Store<appState>) {
    this.products$ = this.store.select(selectCartProducts);
    this.products$.subscribe(products => {
      this.length = products.length;
      this.subTotal = 0;
      this.products$.subscribe(products => {
        for (let i = 0; i < products.length; i++) {
          this.subTotal += products[i].cartQuantity * products[i].price;
        }
      })
    });
  }

  subTotal: number = 0;
  calculateSubTotal() {
    this.subTotal = 0;
    this.products$.subscribe(products => {
      for (let i = 0; i < products.length; i++) {
        this.subTotal += products[i].cartQuantity * products[i].price;
      }
    })
  }
  ngOnInit(): void {
    if (this.product) {
      this.quantityInput = this.product.cartQuantity;
      this.calculateSubTotal() // Assign cart quantity from product
    }

  }

  makeQuantityChange(product: IProduct) {
    this.store.dispatch(addToCart({ product }));
    this.calculateSubTotal();
  }
  makeQuantityChangeSub(cartQuantity: number, product: IProduct) {
    this.store.dispatch(decrementToCart({ product }));
    if (cartQuantity == 1) {
      console.log('entered')
      this.store.dispatch(removeFromCart({ product }));
    }
    this.calculateSubTotal();
  }

  removeProduct(product: IProduct) {

    this.store.dispatch(removeFromCart({ product }));
    this.calculateSubTotal();
  }
  @Input() product!: IProduct;
}
