import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageDto } from './message-dto';
import { CartDto } from './cart-dto';
import { CartItem } from './cart-item';
import { CartItemDto } from './cart-item-dto';

@Injectable({
  providedIn: 'root'
})
export class PurchaseServiceService {
  
  constructor(private http: HttpClient) { }

  addToCart(cartDto: CartDto):Observable<MessageDto>{
    return this.http.put<MessageDto>(`http://localhost:8080/addtocart`, cartDto);
  }

  purchase(customerUserName:String): Observable<MessageDto> {
    return this.http.post<MessageDto>(`http://localhost:8080/purchase`, customerUserName);
  }

  viewCart(customerUserName:String): Observable<CartItemDto[]>{
    return this.http.post<CartItemDto[]>(`http://localhost:8080/viewCart`, customerUserName);
  }
}
