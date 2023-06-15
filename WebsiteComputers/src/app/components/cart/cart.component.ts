import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  constructor(private service: ApiServiceService, private pageTitle: Title) {
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

  getCartItems() {
    this.service.getData('cart').subscribe((result) => {
      this.cartItems = result;
    });
  }

  // getProducts() {
  //   this.service.getData("products").subscribe((result) =>
  //   {
  //     this.products = result.filter((product: any) => this.cartItems.some((item: any) => item.productId === product.id));
  //   });
  // }
  // getProducts() {
  //   this.service.getData('products').subscribe((result) => {
  //     this.products = result.filter((product: any) => {
  //       const cartItem = this.cartItems.find(
  //         (item: any) => item.productId === product.id
  //       );
  //       if (cartItem) {
  //         product.cartItemId = cartItem.id;
  //         return true;
  //       }
  //       return false;
  //     });
  //   });
  // }
  getProducts() {
    this.service.getData('product').subscribe((result) => {
      this.products = result
        .filter((product: any) =>
          this.cartItems.some((item: any) => item.productId === product.id)
        )
        .map((product: any) => {
          const cartItem = this.cartItems.find(
            (item: any) => item.productId === product.id
          );
          return { ...product, cartItemId: cartItem.id };
        });
    });
  }

  deleteProduct(product: any): void {
    this.service.deleteData('cart', product.cartItemId).subscribe(
      () => {
        const index = this.products.findIndex((p: any) => p.id === product.id);
        if (index > -1) {
          this.products.splice(index, 1);
        }
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  updateQuantity(product: any, newQuantity: number): void {
    const cartItem = this.cartItems.find((item: any) => item.productId === product.id);
    const updatedCartItem = { ...cartItem, quantity: newQuantity };

    this.service.putData('cart', cartItem.id, updatedCartItem).subscribe({
        next: () => {
            console.log('Quantity updated successfully');
        },
        error: (error) => {
            console.error('Error updating quantity:', error);
        }
    });
  }
}
