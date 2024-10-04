import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomerService } from '../../service/customer-service.service';
import { CommonModule } from '@angular/common';
import { SucsessComponent } from "../../common/sucsess/sucsess.component";

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [FormsModule, CommonModule, SucsessComponent],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  showForm: boolean = false;
  successful: boolean = false;
  toggleForm() {
    this.showForm = !this.showForm;
  }

  @Output() customerSubmittedHandler = new EventEmitter();

  defaultId: number = -1;
  customerService: CustomerService = inject(CustomerService);
  submit(form: NgForm) {
    console.log(form.value)

    if (form.valid) {
      this.customerService.addCustomer(form.value).subscribe(
        (response) => {
          console.log('Customer added successfully:', response);
          form.reset();
          this.successful = true;
          this.customerSubmittedHandler.emit()// Optionally reset the form after submission
        },
        (error) => {
          console.error('Error adding customer:', error);
        }
      );
    } else {
      console.error('form is not valid')
    }
  }



}
