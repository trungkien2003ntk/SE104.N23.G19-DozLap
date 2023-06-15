import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})

export class HistoryComponent implements OnInit {
  products: any;
  orders: any;
  order_items: any;
  purchaseHistory: any = [];

  constructor(private service: ApiServiceService) {
    this.getDataFromServer();
  }

  ngOnInit() {}

  // combineData() {
  //   for (const order of this.orders) {
  //     const orderItemsForOrder = this.order_items.filter(
  //       (orderItem: any) => orderItem.order_id === order.id
  //     );
  //     const purchase = {
  //       'order_id': order.id,
  //       'created_on_utc': order.created_on_utc,
  //       'total_price': order.total_price,
  //       'products': <any>[],
  //     };
  //     for (const orderItem of orderItemsForOrder) {
  //       const product = this.products.find(
  //         (product: any) => product.id === orderItem.product_id
  //       );
  //       purchase.products.push({
  //         'product_id': product.id,
  //         'name': product.name,
  //         'image_url': product.image_url,
  //         'price': product.price,
  //         'quantity': orderItem.quantity,
  //       });
  //     }
  //     this.purchaseHistory.push(purchase);
  //     console.log('This is all data', this.purchaseHistory);
  //   }
  // }

  combineData() {
    for (const order of this.orders) {
      const orderItemsForOrder = this.order_items.filter(
        (orderItem: any) => orderItem.order_id === order.id
      );
  
      for (const orderItem of orderItemsForOrder) {
        const product = this.products.find((product: any) => product.id === orderItem.product_id);
  
        const row = {
          'name': product.name,
          'image_url': product.image_url,
          'price': product.price,
          'quantity': orderItem.quantity,
          'total_price': product.price * orderItem.quantity,
          'created_on_utc': order.created_on_utc,
          'status': order.status
        };
  
        this.purchaseHistory.push(row);
      }
    }
    console.log('This is all data', this.purchaseHistory);
  }

  getDataFromServer() {
    forkJoin([
      this.service.getData('product'),
      this.service.getData('orders'),
      this.service.getData('order_item'),
    ]).subscribe(([products, orders, orderItems]) => {
      this.products = products;
      this.orders = orders;
      this.order_items = orderItems;
      console.log('This is all product', this.products);
      console.log('This is all orders', this.orders);
      console.log('This is all items', this.order_items);
      this.combineData();

    });
  }

  cancel(purchase:any){

  }
}
