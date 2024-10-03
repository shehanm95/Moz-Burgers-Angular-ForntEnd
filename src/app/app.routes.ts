import { Routes } from '@angular/router';
import { HomeComponent } from './ele/home/home.component';
import { CartComponent } from './ele/cart/cart.component';
import { AddProductComponent } from './ele/add-product/add-product.component';
import { ViewProductComponent } from './ele/view-product/view-product.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "addProduct", component: AddProductComponent },
    { path: "viewProduct/:id", component: ViewProductComponent },
    { path: "cart", component: CartComponent }
];
