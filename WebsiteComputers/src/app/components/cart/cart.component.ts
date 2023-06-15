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
  newItems:any;
  total = 0;

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

  combineTables(){
    this.newItems = this.products.map((product:any) => {
      const cartItem = this.cartItems.find((cartItem:any) => cartItem.productId === product.id);
      return {
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        cartItemId: cartItem.id,
        quantity: cartItem ? cartItem.quantity : 0,
      };
    });
    this.onInputChange(null, 0);
  }

  getCartItems() {
    this.service.getData('cart').subscribe((result) => {
      this.cartItems = result;
    });
    
  }

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
        this.combineTables();
    });
  }

  deleteProduct(product: any): void {
    this.service.deleteData('cart', product.cartItemId).subscribe(
      () => {
        const index = this.newItems.findIndex((p: any) => p.id === product.id);
        if (index > -1) {
          this.newItems.splice(index, 1);
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

    this.service.putData('shopping_cart_item', cartItem.id, updatedCartItem).subscribe({
        next: () => {
            console.log('Quantity updated successfully');
        },
        error: (error) => {
            console.error('Error updating quantity:', error);
        }
    });
  }

  onInputChange(item:any, quantity: number){
    this.total = 0;
    for (let p of this.newItems)
    {
      if (item != null){
        if (p.id === item.id)
        {
          p.quantity = quantity;
        }
      }
      console.log('This is price', p.price);
      console.log('This is quantity', p.quantity);
      this.total += p.price * p.quantity;
    }
    console.log('This is total!', this.total);
  }
}
