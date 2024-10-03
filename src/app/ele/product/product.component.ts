import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct, productBaseUrl, } from '../../service/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productBaseUrl: string = productBaseUrl;

  constructor(private router: Router) { }

  viewProduct(id: number) {
    this.router.navigate(['/viewProduct', id]);
  }

  addToCart(product: IProduct) {
    this.handleAdd.emit(product);
  }
  @Input() product!: IProduct;
  @Output() handleAdd = new EventEmitter;
}
