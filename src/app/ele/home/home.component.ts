import { Component } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { CartComponent } from "../cart/cart.component";
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent, CartComponent, RouterLink, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
