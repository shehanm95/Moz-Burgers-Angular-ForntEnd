import { Component } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { CartComponent } from "../cart/cart.component";
import { RouterLink } from '@angular/router';
import { FilterProductsComponent } from "../filter-products/filter-products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent, CartComponent, RouterLink, FilterProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
