import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddCustomerComponent } from "../add-customer/add-customer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService, ICustomer } from '../../service/customer-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [AddCustomerComponent, FormsModule, CommonModule,],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers$: Observable<ICustomer[]>; // Store the customer data as an Observable


  constructor(private customerService: CustomerService, private router: Router) {
    this.customers$ = this.customerService.getAllCustomers();
  }

  isComponentVisible = true;

  // Method to force rebuild of the child component (or template)
  rebuildTemplate() {
    this.isComponentVisible = false; // Hide the component (destroy it)
    setTimeout(() => {
      this.isComponentVisible = true; // Rebuild (show) the component
    }, 0); // Rebuild after a short delay
  }

  deleteCustomer(id: number) {
    console.log('delete' + id)
    this.customerService.deleteCustomer(id);
    this.rebuildTemplate()
    this.refreshList()
    this.rebuildTemplate()
  }

  refreshList() {
    this.customers$ = this.customerService.getAllCustomers();
  }


}