import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDto } from './customer-dto';
import { Customer } from './customer';
import { UserLoginDto } from './user-login-dto';
import { MessageDto } from './message-dto';
import { PasswordDto } from './password-dto';
import { CustomerPurchaseDto } from './customer-purchase-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  addCustomer(customerDto: CustomerDto):Observable<Customer>{
    return this.http.post<Customer>(`http://localhost:8080/register`, customerDto);
  }

  authenticateCustomer(userLoginDto: UserLoginDto):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/authenticate`, userLoginDto);
  }

  authenticateCustomerMailId(customerMailId: string):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/authenticate/${customerMailId}`);
  }

  authenticateCustomerOtp(passwordDto: PasswordDto):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/authenticateOtp`, passwordDto);
  }

  changePassword(customerDto: CustomerDto):Observable<MessageDto>{
    return this.http.post<MessageDto>(`http://localhost:8080/changePassword`, customerDto);
  }

  viewCustomers():Observable<CustomerPurchaseDto[]>{
    return this.http.get<CustomerPurchaseDto[]>(`http://localhost:8080/viewCustomers`);
  }

}
