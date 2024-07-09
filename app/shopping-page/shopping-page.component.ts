import { Component, OnInit } from '@angular/core';
import { GroceryItem } from '../grocery-item';
import { ActivatedRoute, Router } from '@angular/router';
import { GroceryServiceService } from '../grocery-service.service';
import { CartItem } from '../cart-item';
import { GroceryItemDto } from '../grocery-item-dto';
import { PurchaseServiceService } from '../purchase-service.service';
import { CartDto } from '../cart-dto';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {
  constructor(private router: Router, private cookieService: CookieService, private grocerySvc: GroceryServiceService, private activatedRoute: ActivatedRoute, private purchaseSvc: PurchaseServiceService) { }
  userName: string = '';
  groceryItem: GroceryItem = {
    id: 0,
    itemId: '',
    itemName: '',
    itemPrice: 0,
    itemBrand: ''
  };
  groceryItemsDto: GroceryItemDto[] = [];
  groceryItemDto: GroceryItemDto = {
    itemId: '',
    itemName: '',
    itemPrice: 0,
    itemBrand: '',
    quantity: 0
  };
  cart: CartDto = {
    customerUserName: '',
    itemList: []
  };
  cartItems: CartItem[] = [];
  cartItem: CartItem = {
    itemId: '',
    quantity: 0,
    totalPrice: 0
  };
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((data) => {
      this.userName = data['name'];
    });

    if (this.cookieService.get('cUser')) {
      this.grocerySvc.viewGroceries(this.userName).subscribe(data => {
        for (let item of data) {
          this.groceryItemDto.itemId = item.itemId;
          this.groceryItemDto.itemName = item.itemName;
          this.groceryItemDto.itemBrand = item.itemBrand;
          this.groceryItemDto.quantity = item.quantity;
          this.groceryItemDto.itemPrice = item.itemPrice;
          this.groceryItemsDto.push(this.groceryItemDto);
          this.groceryItemDto = {
            itemId: '',
            itemName: '',
            itemPrice: 0,
            itemBrand: '',
            quantity: 0
          };
        }
      })
    }
    else {
      alert('Please Sign in first')
      this.router.navigate(['login'])
    }
  }

  title = 'project';

  imgAdd1: string = "../assets/";
  imgAdd2: string = ".jpg";
  signOut(){
    this.cookieService.delete('cUser');
    this.router.navigate(['login']);
  }

  increaseQuantity(groceryItem: GroceryItemDto): void {
    groceryItem.quantity += 1;

  }

  decreaseQuantity(groceryItem: GroceryItemDto): void {
    if (groceryItem.quantity > 0) {
      groceryItem.quantity -= 1;
    }
  }

  addToCart() {
    for (let item of this.groceryItemsDto) {
      if (item.quantity > 0) {
        this.cartItem.itemId = item.itemId;
        this.cartItem.quantity = item.quantity;
        this.cartItem.totalPrice = item.itemPrice * item.quantity;
        this.cartItems.push(this.cartItem);
        this.cartItem = {
          itemId: '',
          quantity: 0,
          totalPrice: 0
        };
      }
    }
    this.cart.customerUserName = this.userName;
    this.cart.itemList = this.cartItems;
    if (this.cart.itemList.length>0){
      this.purchaseSvc.addToCart(this.cart).subscribe(data=>{
        this.router.navigate(['purchase', this.userName]);
      });
    }
    else{
      alert("Add some items to the Cart");
    }
  }
}
