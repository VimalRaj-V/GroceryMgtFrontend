import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDto } from '../user-login-dto';
import { CustomerService } from '../customer.service';
import { CustomerDto } from '../customer-dto';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  user: UserLoginDto = { 'customerUserName': '', 'customerPassword': '' };
  authUser: CustomerDto = { customerUserName: '', customerPassword: '', customerName: '', customerMailId: '' };
  constructor(private router: Router, private customerSvc: CustomerService, private cookieService: CookieService) { }
 
  goShopping() {
    this.customerSvc.authenticateCustomer(this.user).subscribe(data => {
      this.authUser = data;
      
      if(data.message){
        this.cookieService.set('cAdmin', "admin");
        this.router.navigate(['admin']);
      }
      else{
        this.cookieService.set('cUser', this.authUser.customerUserName);
        alert("Hi " + this.authUser.customerUserName);
        this.router.navigate(['shopping', this.user.customerUserName]);
      }
    },
      error => {
        this.cookieService.delete('cUser');
        alert(error.error.message);
      });
  }

  register() {
    this.router.navigate(['register']);
  }

  forgetPassword(){
    this.router.navigate([]);
  }
}
