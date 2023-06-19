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
  visible = true;

  constructor(private service: ApiServiceService) {
    this.getDataFromServer();
  }

  ngOnInit() {}

  combineData() {
    this.purchaseHistory = [];

    for (const order of this.orders) {
      const orderItemsForOrder = this.order_items.filter(
        (orderItem: any) => orderItem.order_id === order.id
      );

      for (const orderItem of orderItemsForOrder) {
        const product = this.products.find(
          (product: any) => product.id === orderItem.product_id
        );

        const row = {
          'product_id' : product.id,
          'name': product.name,
          'image_url': product.image_url,
          'price': product.price,
          'quantity': orderItem.quantity,
          'total_price': product.price * orderItem.quantity,
          'created_on_utc': order.created_on_utc,
          'status': order.status,
          'order_item_id': orderItem.id,
          'rate': orderItem.rate,
          'comment': orderItem.comment,
          'rate_visible': false,
          'order_id': order.id
        };

        this.purchaseHistory.push(row);
      }
    }
    this.purchaseHistory.reverse();
    // console.log('This is all data', this.purchaseHistory);
  }

  getDataFromServer() {
    const variantId = sessionStorage.getItem('id');
    if (variantId == null) {
      return;
    }
    this.service.getData('orders').subscribe((orders: any[]) => {
      // Filter orders by customer_id
      this.orders = orders.filter((order) => order.customer_id === variantId);

      // Retrieve products and order items
      forkJoin([
        this.service.getData('product'),
        this.service.getData('order_item'),
      ]).subscribe(([products, orderItems]) => {
        this.products = products;
        this.order_items = orderItems;
        // console.log('This is all product', this.products);
        // console.log('This is all items', this.order_items);

        this.combineData();
      });
    });
  }

  cancel(purchase: any) {
    let order = this.orders.find((order: any) => order.id === purchase.order_id);
    order.total_price -= purchase.total_price;
    
    this.service
      .deleteData('order_item', purchase.order_item_id)
      .subscribe((nothing: any) => {
        this.service.putData('orders', purchase.order_id, order)
        .subscribe((nothing: any)=>
        this.getDataFromServer());
      });
  }

  openRate(purchase: any) {
    purchase.rate_visible = true;
  }

  send(order_item_id: any) {
    // Find the order_item and purchase_history_item with the given order_item_id
    const order_item = this.order_items.find(
      (item: any) => item.id === order_item_id
    );
    const purchase_history_item = this.purchaseHistory.find(
      (item: any) => item.order_item_id === order_item_id
    );

    // Update the order_item with the rate and comment from the purchaseHistory
    if (order_item && purchase_history_item) {
      order_item.rate = purchase_history_item.rate;
      order_item.comment = purchase_history_item.comment;
    }

    // Send the updated order_items array to the server
    this.service.putData('order_item', order_item.id, order_item).subscribe();
    purchase_history_item.rate_visible = false;
  }
}
