import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageDto } from './message-dto';
import { GroceryDto } from './grocery-dto';
import { ProductPerformaceDto } from './product-performace-dto';
import { GroceryItemDto } from './grocery-item-dto';

@Injectable({
  providedIn: 'root'
})
export class GroceryServiceService {

  constructor(private http: HttpClient) { }

  addGrocery(groceryDto:GroceryDto):Observable<MessageDto>{
    return this.http.post<MessageDto>(`http://localhost:8080/addGrocery`, groceryDto);
  }

  modifyGrocery(itemId:string, groceryDto:GroceryDto):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/modifyGrocery/${itemId}`, groceryDto);
  }

  deleteGrocery(itemId:string):Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/deleteGrocery/${itemId}`);
  }

  viewGroceries(customerUserName:string): Observable<GroceryItemDto[]> {
    return this.http.get<GroceryItemDto[]>(`http://localhost:8080/view/${customerUserName}`);
  }

  productPerformance():Observable<ProductPerformaceDto[]>{
    return this.http.get<ProductPerformaceDto[]>(`http://localhost:8080/productPerformance`);
  }

}
