import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { appState } from '../../appState';
import { selectCartProducts } from '../../state/cartState/cart.selector';
import { Observable } from 'rxjs';
import { IProduct } from '../../service/product-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  showNavBar: boolean = true;
  toggleNavBar() {
    this.showNavBar = !this.showNavBar;
  }
  products$: Observable<IProduct[]>;
  products!: IProduct[];
  quantity: number = 0;
  constructor(private store: Store<appState>) {
    this.products$ = store.select(selectCartProducts)
    this.products$.subscribe(products => {
      this.products = products;
      this.quantity = 0;
      products.forEach(product => {
        this.quantity += product.cartQuantity;
      });
    })
  }
}
