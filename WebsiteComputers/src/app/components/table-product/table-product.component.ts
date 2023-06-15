import { Component, Input } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css'],
})
export class TableProductComponent {
  @Input() contents: any = [];
  responsiveOptions: any;

  //test
  sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
  ];

  sortOrder: number = 0;
  sortField: string = '';
  sortKey: any;

  constructor(private service: ApiServiceService) {
    this.initResponsive();
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

  addToCart(id: any) {
    console.log(id, 'This is value!!!');
    const data = {
      "id" : Math.floor(Math.random() * 1000000),
      "productId": id,
      "customerId": 1,
    };
    this.service.postData("cart", data).subscribe((result) =>
    {
      console.log(result, "This is postData");
    });
  }
}
