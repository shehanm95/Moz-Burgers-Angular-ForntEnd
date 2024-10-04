import { Component, inject, Input, ViewChild } from '@angular/core';
import { getProductCategories, IProduct, productBaseUrl, ProductServiceService } from '../../service/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { AddQuantityComponent } from "../add-quantity/add-quantity.component";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { appState } from '../../appState';
import { SucsessComponent } from "../../common/sucsess/sucsess.component";

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule, FormsModule, AddQuantityComponent, SucsessComponent],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  successful: boolean = false;
  router: Router = inject(Router);
  deleteProduct(id: number) {
    this.http.delete(`http://localhost:8080/product/delete/${id}`)
      .subscribe(response => {
        console.log('Product deleted successfully', response);
        this.successful = true
        setTimeout(() => {
          this.router.navigate([''])
        }, 1000)
      }, error => {
        console.error('Error deleting product', error);
      });
  }
  product!: IProduct;
  @ViewChild('updateProductForm', { static: true }) productUpdateForm!: NgForm;
  cartProducts$: Observable<IProduct[]>;
  saving: boolean = false;
  constructor(private route: ActivatedRoute, private store: Store<appState>, private http: HttpClient, private productService: ProductServiceService) {
    this.cartProducts$ = this.store.select(state => state.cartState.products);

  }

  saveQuantityToDB(quantity: number) {
    this.product.quantity += quantity;
    this.isDisabled = false;
    console.log(this.product)
    setTimeout(() => {

    }, 1000)
    this.saveJsonProduct(this.product);


    // This will log the form element to the console

  }
  editButtonValue: string = "Edit Product";
  isDisabled: boolean = true;



  toggleFormEnable() {
    this.isDisabled = !this.isDisabled;
    this.editButtonValue = "Cancel Edit"
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');  // Get the product ID from the URL

    // Fetch the product using the ID
    if (productId) {
      this.productService.getProductById(productId).subscribe((product) => {
        this.product = product;
        this.imageUrl = productBaseUrl + "/getImage/" + this.product.imagePath;
        console.log(product);

        // Now check if the product is in the cart and update its cartQuantity if necessary
        this.cartProducts$.pipe(
          map(cartProducts => {
            const cartProduct = cartProducts.find(cp => cp.id === product.id);
            this.product.cartQuantity = cartProduct ? cartProduct.cartQuantity : 0;
          })
        ).subscribe();  // Subscribe to the cart state changes
      });
    }
  }




  //==================================

  categories = getProductCategories;

  imageUrl: string | ArrayBuffer | null = "/assets/images/tempBurg.webp";
  imageFile: File | null = null;
  defaultId: number = -1;



  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;
      console.log("image loaded")
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  submit(f: NgForm, product: IProduct) {
    console.log(f)
    this.saving = true;
    if (f.valid && this.imageFile) {
      console.log("Form is valid");
      const formData = new FormData();
      console.log(f.value); // Log the form data to see if values are correct
      formData.append('id', f.value.id);
      formData.append('name', f.value.name);
      formData.append('description', f.value.description);
      formData.append('category', f.value.category);
      formData.append('quantity', product.quantity.toString()); // Ensure these are strings if needed
      formData.append('price', f.value.price.toString()); // Ensure these are strings if needed
      if (this.imageFile)
        formData.append('image', this.imageFile);

      this.http.put('http://localhost:8080/product/update', formData)
        .subscribe(response => {
          console.log('Product updated successfully', response);
          this.saving = false;
          this.isDisabled = true;
          this.successful = true;
        }, error => {
          console.error('Error updating product', error);
        });
    } else if (f.valid) {
      console.log(f.value)
      this.saveJsonProduct(f.value);
    } else {
      console.error("form is invalid")
    }

  }
  saveJsonProduct(product: IProduct) {
    this.http.put<IProduct>("http://localhost:8080/product/update/simple", product)
      .subscribe(response => {
        console.log('Product updated successfully', response);
        this.saving = false;
        this.isDisabled = true;
      }, error => {
        console.error('Error updating product', error);
      });

  }

}


