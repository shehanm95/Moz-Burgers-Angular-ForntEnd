import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService, ICustomer } from '../../service/customer-service.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-cart-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './set-cart-customer.component.html',
  styleUrl: './set-cart-customer.component.css'
})
export class SetCartCustomerComponent {

  displaySelector: boolean = false;

  selectedCustomer?: ICustomer;

  setCustomer(customer: ICustomer) {
    this.selectedCustomer = customer;
  }
  customers$: Observable<ICustomer[]>;
  searchVal: string = "";
  filteredCustomers$: Observable<ICustomer[]>;

  constructor(private customerService: CustomerService, private router: Router) {
    this.customers$ = this.customerService.getAllCustomers();
    this.filteredCustomers$ = this.displayCustomers();
  }
  displayCustomers(): Observable<ICustomer[]> {
    this.customers$ = this.customerService.getAllCustomers();
    this.customers$.subscribe(customers => {
      let fCustomers: ICustomer[] = [];
      for (let i = 0; i < customers.length; i++) {
        if (customers[i].firstName.includes(this.searchVal) || customers[i].lastName.includes(this.searchVal))
          fCustomers.push(customers[i]);
      }
      this.filteredCustomers$ = of(fCustomers)
      return of(fCustomers)
    })
    this.refreshList()
    this.rebuildTemplate()
    return this.customers$;
  }

  isComponentVisible = true;
  rebuildTemplate() {
    this.isComponentVisible = false; // Hide the component (destroy it)
    setTimeout(() => {
      this.isComponentVisible = true; // Rebuild (show) the component
    }, 0); // Rebuild after a short delay
  }
  refreshList() {
    this.customers$ = this.customerService.getAllCustomers();
  }

}
