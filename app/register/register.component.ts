import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerDto } from '../customer-dto';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: CustomerDto = { customerUserName: '', customerPassword: '', customerName: '', customerMailId: '' };
  constructor(private router: Router, private customerSvc: CustomerService) { }

  addUser(){
    this.customerSvc.addCustomer(this.user).subscribe(data => {
      this.user = data
      console.log(this.user.customerUserName);
      alert("Hi " + this.user.customerUserName
        +"\n Please Login using your credentials!"
      );
      this.router.navigate(['login'])
    },
    error => {
      alert("Enter a uniue user name");
    });
  }
  
}
