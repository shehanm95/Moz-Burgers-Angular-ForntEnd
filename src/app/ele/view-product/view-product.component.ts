import { Component } from '@angular/core';
import { IProduct, productBaseUrl, ProductServiceService } from '../../service/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  categories: any;
  submit(_t7: NgForm) {
    throw new Error('Method not implemented.');
  }
  onImageUpload($event: Event) {
    throw new Error('Method not implemented.');
  }

  product!: IProduct;
  imageUrl: string = "";

  constructor(private route: ActivatedRoute, private productService: ProductServiceService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');  // Get the product ID from the URL

    // Fetch the product using the ID (you can replace this with however you're retrieving the product)
    if (productId) {
      this.productService.getProductById(productId).subscribe((product) => {
        this.product = product;
        this.imageUrl = productBaseUrl + "/getImage/" + this.product.imagePath;
        console.log(product);
      });
    }
  }
}
