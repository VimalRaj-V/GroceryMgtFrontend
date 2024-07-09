import { Component, OnInit } from '@angular/core';
import { PurchaseServiceService } from '../purchase-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemDto } from '../cart-item-dto';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-purchase-page',
  templateUrl: './purchase-page.component.html',
  styleUrls: ['./purchase-page.component.css']
})
export class PurchasePageComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private purchaseSvc: PurchaseServiceService, private cookieService: CookieService) { }
  userName: string = '';
  currentOperation: string = 'beforePurchase';
  cartItems: CartItemDto[] = [];
  totalCost = 0;
  totalQty = 0;
  displayedColumns: string[] = ['itemName', 'itemPrice', 'itemBrand', 'quantity', 'totalPrice'];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.userName = data['name'];
      
    });
    if(this.cookieService.get('cUser')){
      this.purchaseSvc.viewCart(this.userName).subscribe(data => {
        this.cartItems = data;
        for(let cartItem of this.cartItems){
          this.totalCost += cartItem.totalPrice;
          this.totalQty += cartItem.quantity;
        }
      });
    }
    else{
      alert("Please Sign In first");
      this.router.navigate(['login']);
    }
  }
  
  purchase(){
    this.currentOperation = 'onPurchase';
    this.purchaseSvc.purchase(this.userName).subscribe(data =>{
      alert("Purchase Successfull!");
      this.router.navigate(['shopping', this.userName]);
    });
  }

  goToCart(){
    this.router.navigate(['shopping', this.userName]);
  }
}
