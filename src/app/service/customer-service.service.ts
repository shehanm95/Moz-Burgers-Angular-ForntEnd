import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';// Adjust the path according to your structure

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/customer'; // API endpoint

  constructor(private http: HttpClient) { }

  // Method to get all customers
  getAllCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.apiUrl + "/all");
  }

  addCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(`${this.apiUrl}/add`, customer);
  }


  deleteCustomer(id: number): void {
    this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
      (response) => {
        console.log('Customer deleted successfully:', response);
        // Perform any additional actions, such as refreshing the customer list
      },
      (error) => {
        console.error('Error deleting customer:', error);
      }
    );



  }
}

export interface ICustomer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}



