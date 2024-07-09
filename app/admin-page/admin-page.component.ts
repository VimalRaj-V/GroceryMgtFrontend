import { Component, OnInit } from '@angular/core';
import { GroceryServiceService } from '../grocery-service.service';
import { GroceryDto } from '../grocery-dto';
import { ProductPerformaceDto } from '../product-performace-dto';
import { CustomerService } from '../customer.service';
import { CustomerPurchaseDto } from '../customer-purchase-dto';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  constructor(private router: Router, private grocerySvc: GroceryServiceService, private customerSvc: CustomerService, private cookieService: CookieService) {
    this.sortedData = this.productPerformaceDto.slice();
  } 
  
  ngOnInit(): void {
    if (this.cookieService.get("cAdmin")) {
      this.grocerySvc.productPerformance().subscribe(data => {
        this.sortedData = data;
      })
    }
    else {
      alert("Please Sign In first");
      this.router.navigate(['login']);
    }

  };
  sortedData: ProductPerformaceDto[];
  currentOperation: string = '';
  itemId: string = '';
  customerPurchaseDto: CustomerPurchaseDto[] = [];
  groceryDto: GroceryDto = {
    itemName: '',
    itemPrice: 0,
    itemBrand: ''
  };

  productPerformaceDto: ProductPerformaceDto[] = [];
  displayedColumns: string[] = ['itemId', 'itemName', 'itemPrice', 'itemBrand', 'quantitySold', 'revenueGenerated'];
  displayedColumnsCustomer: string[] = ['customerName', 'customerUserName', 'purchasesMade', 'totalPurchasedAmount', 'avgPurchasedAmount'];
  addGrocery() {
    this.grocerySvc.addGrocery(this.groceryDto).subscribe(data => {
      alert("Item Successfully Added");
    });
  }

  modifyGrocery() {
    this.grocerySvc.modifyGrocery(this.itemId, this.groceryDto).subscribe(data => {
      alert("Grocery item details updated successfully!")

    },
      error => {
        alert(error.error.message);
      });
  }

  deleteGrocery() {
    this.grocerySvc.deleteGrocery(this.itemId).subscribe(data => {
      alert("Item successfully deleted!");
    },
      error => {
        alert(error.error.message);
      })
  }

  groceryPerformance() {
    this.grocerySvc.productPerformance().subscribe(data => {
      this.productPerformaceDto = data;
    })
  }

  viewCustomers() {
    this.customerSvc.viewCustomers().subscribe(data => {
      this.customerPurchaseDto = data;
      console.log(this.customerPurchaseDto);
    });
  }

  signOut() {
    this.cookieService.delete('cAdmin');
    this.router.navigate(['login']);
  }

  sortData(sort: Sort) {
    const data = this.productPerformaceDto.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'itemId':
          return compare(a.itemId, b.itemId, isAsc);
        case 'itemName':
          return compare(a.itemName, b.itemName, isAsc);
        case 'itemPrice':
          return compare(a.itemPrice, b.itemPrice, isAsc);
        case 'itemBrand':
          return compare(a.itemBrand, b.itemBrand, isAsc);
        case 'quantitySold':
          return compare(a.quantitySold, b.quantitySold, isAsc);
        case 'revenueGenerated':
          return compare(a.revenueGenerated, b.revenueGenerated, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}