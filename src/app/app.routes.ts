import { Routes } from '@angular/router';
import { HomeComponent } from './ele/home/home.component';
import { CartComponent } from './ele/cart/cart.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "cart", component: CartComponent }
];
