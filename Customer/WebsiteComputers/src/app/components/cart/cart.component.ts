import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  products: any = [];
  responsiveOptions: any;
  cartItems: any = [];
  newItems: any;
  total = 0;

  constructor(
    private service: ApiServiceService,
    private pageTitle: Title,
    private router: Router
  ) {
    pageTitle.setTitle('Cart');
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

  ngOnInit() {
    this.getCartItems();

    this.getProducts();
  }

  combineTables() {
    this.newItems = this.products.map((product: any) => {
      const cartItem = this.cartItems.find(
        (cartItem: any) => cartItem.product_id === product.id
      );
      return {
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        cart_item_id: cartItem.id,
        quantity: cartItem ? cartItem.quantity : 0,
      };
    });
    this.onInputChange(null, 0);
  }

  getCartItems() {
    const customerId = sessionStorage.getItem('id');
    this.service.getData('shopping_cart_item').subscribe((result) => {
      this.cartItems = result.filter(
        (item: any) => item.customer_id === customerId
      );
      // console.log('This is current id', customerId);
      // console.log('This is all cartItems', result);
      // console.log('This is all items got', this.cartItems);
    });
  }

  getProducts() {
    this.service.getData('product').subscribe((result) => {
      this.products = result
        .filter((product: any) =>
          this.cartItems.some((item: any) => item.product_id === product.id)
        )
        .map((product: any) => {
          const cartItem = this.cartItems.find(
            (item: any) => item.product_id === product.id
          );
          return { ...product, cart_item_id: cartItem.id };
        });
      this.combineTables();
    });
  }

  deleteProduct(product: any): void {
    this.service
      .deleteData('shopping_cart_item', product.cart_item_id)
      .subscribe(
        () => {
          const index = this.newItems.findIndex(
            (p: any) => p.id === product.id
          );
          if (index > -1) {
            this.newItems.splice(index, 1);
            this.onInputChange(null, 0);
          }
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
  }

  onInputChange(item: any, quantity: number) {
    this.total = 0;
    for (let p of this.newItems) {
      if (item != null) {
        if (p.id === item.id) {
          p.quantity = quantity;
        }
      }
      this.total += p.price * p.quantity;
    }
  }

  checkOut() {
    const newCartItems = this.newItems.map((item: any) => {
      return {
        id: item.cart_item_id,
        customer_id: sessionStorage.getItem('id'),
        product_id: item.id,
        quantity: item.quantity,
      };
    });

    // for (let item of newCartItems){
    //   this.service.putData('shopping_cart_item', item.id, item).subscribe();
    // }
    // this.router.navigate(['order']);
    const updateRequests = [];

    for (let item of newCartItems) {
      updateRequests.push(
        this.service.putData('shopping_cart_item', item.id, item)
      );
    }

    forkJoin(updateRequests).subscribe(() => {
      this.router.navigate(['order']);
    });
  }
}
