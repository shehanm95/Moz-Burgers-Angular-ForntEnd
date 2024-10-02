import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../service/product-service.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  addToCart(product: IProduct) {
    this.handleAdd.emit(product);
  }
  @Input() product!: IProduct;
  @Output() handleAdd = new EventEmitter;
}
