import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IProduct, productBaseUrl, } from '../../service/product-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnChanges {

  quantityString: string = ""
  outOfStock: boolean = false;
  showQuantity() {
    let quantity = this.product.quantity - (this.product.cartQuantity || 0);
    console.log("cart 1 : " + (this.product.cartQuantity || 0))
    console.log(this.product.quantity)
    if (quantity > 0) {
      this.quantityString = "Q : " + quantity.toString().padStart(2, '0');
      this.outOfStock = false;
    } else {
      this.quantityString = "Out Of Stock."
      this.outOfStock = true;
    }
  }
  productBaseUrl: string = productBaseUrl;

  constructor(private router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.showQuantity();
  }


  viewProduct(id: number) {
    this.router.navigate(['/viewProduct', id]);
  }



  addToCart(product: IProduct) {
    // Create a copy of the product object and update the cartQuantity
    const updatedProduct = { ...product, cartQuantity: (product.cartQuantity || 0) + 1 };

    // Emit the updated product to the parent component
    this.handleAdd.emit(updatedProduct);

    // Update the local product reference and show quantity
    this.product = updatedProduct;
    this.showQuantity();
  }
  @Input() product!: IProduct;
  @Output() handleAdd = new EventEmitter;
}
