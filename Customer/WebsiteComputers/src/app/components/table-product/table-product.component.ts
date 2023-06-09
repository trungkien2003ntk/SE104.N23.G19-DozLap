import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css'],
})
export class TableProductComponent {
  @Input() contents: any = [];

  responsiveOptions: any;
  cartItems: any = [];

  //test
  sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
  ];

  sortOrder: number = 0;
  sortField: string = '';
  sortKey: any;

  constructor(private service: ApiServiceService, private cdr: ChangeDetectorRef, private router : Router) {
    this.initResponsive();
  }

  ngOnInit() {
  }

  initResponsive() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  async getCartItems(): Promise<any> {
    return new Promise<void>(resolve => {
      this.service.getData('shopping_cart_item').subscribe((result) => {
        this.cartItems = result;
        resolve();
      });
    });
  }

  isDifferentFromAll(data:any, allData:any){
    for (const otherData of allData) {
      console.log('Data', data);
      console.log('other data', otherData);
      if (data.product_id === otherData.product_id && data.customer_id === otherData.customer_id) {
        return false;
      }
    }
    return true;
  }

  async addToCart(id: any) {
    if (!Number(sessionStorage.getItem('id'))){
      this.router.navigate(['login']);
      return;
    }
    await this.getCartItems();
    const data = {
      "product_id": id,
      "customer_id": Number(sessionStorage.getItem('id')),
      "quantity": 1
    };
    if (this.isDifferentFromAll(data, this.cartItems)) {
      this.service.postData("shopping_cart_item", data).subscribe((result) =>
      {
        // console.log(result, "This is postData");
        alert('Add to cart successfully!');

      });
    }
    else{
      // console.log("Duplicate id!");
      alert('Duplicate id!');
    }
  }
}
