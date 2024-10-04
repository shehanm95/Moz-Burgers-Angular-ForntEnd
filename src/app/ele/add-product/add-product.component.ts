import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { getProductCategories } from '../../service/product-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class AddProductComponent {
  categories = getProductCategories

  imageUrl: string | ArrayBuffer | null = "/assets/images/tempBurg.webp";
  imageFile: File | null = null;
  defaultId: number = -1;

  constructor(private http: HttpClient) { }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submit(f: NgForm) {
    if (f.valid && this.imageFile) {
      const formData = new FormData();
      formData.append('id', f.value.id);
      formData.append('name', f.value.name);
      formData.append('description', f.value.description);
      formData.append('category', f.value.category);
      formData.append('quantity', f.value.quantity);
      formData.append('price', f.value.price);
      formData.append('image', this.imageFile);

      this.http.post('http://localhost:8080/product/add', formData)
        .subscribe(response => {
          console.log('Product added successfully', response);
        }, error => {
          console.error('Error adding product', error);
        });
    } else {
      console.error('Form is invalid or image not selected');
    }
  }
}
