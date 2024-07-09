import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { PasswordDto } from '../password-dto';
import { CustomerDto } from '../customer-dto';
import { MessageDto } from '../message-dto';

@Component({
  selector: 'app-forget-password-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.css']
})
export class ForgetPasswordPageComponent {
  constructor(private router: Router, private customerSvc: CustomerService) { };
  operationLevel:number = 1;
  messageDto: MessageDto = {
    message: ''
  };
  passwordDto: PasswordDto={
    customerMailId: '',
    customerOtp: ''
  };
  customerDto: CustomerDto ={
    customerUserName: '',
    customerName: '',
    customerPassword: '',
    customerMailId: ''
  };
  control1: boolean=false;
  control2: boolean=false;
  control3: boolean=false;

 
  sendOtp(){
    this.customerSvc.authenticateCustomerMailId(this.passwordDto.customerMailId).subscribe(data =>{
      this.customerDto = data;
      this.operationLevel+=1;
      this.control1 = true;
    },
    error => {
      this.messageDto = error.error;
      alert(this.messageDto.message);
    });
  }

  verifyOtp(){
    
    this.customerSvc.authenticateCustomerOtp(this.passwordDto).subscribe(data=>{
      this.operationLevel+=1;
      this.control2 = true;
    },
    error => {
      this.messageDto = error.error;
      alert(this.messageDto.message);
    });
  }

  changePassword(){
    this.customerSvc.changePassword(this.customerDto).subscribe(data =>{
      alert("Password Successfully Changed!");
      this.router.navigate(['login']);
    },
    error => {
      this.messageDto = error.error;
      alert(this.messageDto.message);
    });
  }
}
