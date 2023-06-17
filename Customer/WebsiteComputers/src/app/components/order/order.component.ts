import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  public formOrder = this.formBuilder.group({
    note: [''],
    street: ['', Validators.required],
    house_number: ['', Validators.required],
  });

  products: any = [];
  responsiveOptions: any;
  cartItems: any = [];
  newItems: any;
  provinces: any;
  selectedProvince: any;
  total = 0;
  customer: any;
  time: any;

  constructor(
    private service: ApiServiceService,
    private pageTitle: Title,
    private formBuilder: FormBuilder
  ) {
    pageTitle.setTitle('Order');
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

    this.getProvince();

    this.time = new Date();
    document.getElementById('datetime')!.textContent =
      'Created at: ' + this.time.toLocaleString();

    this.getCustomer();
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
    this.calTotal();
  }

  getCustomer() {
    this.customer = {
      id: sessionStorage.getItem('id'),
      first_name: sessionStorage.getItem('first_name'),
      last_name: sessionStorage.getItem('last_name'),
      email: sessionStorage.getItem('email'),
      phone_number: sessionStorage.getItem('phone_number'),
    };
  }

  getCartItems() {
    const customerId = sessionStorage.getItem('id');
    this.service.getData('shopping_cart_item').subscribe((result) => {
      this.cartItems = result.filter(
        (item: any) => item.customer_id === customerId
      );
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

  getProvince() {
    this.service.getData('province').subscribe((result) => {
      this.provinces = result;
      this.selectedProvince = this.provinces[0];
    });
  }

  calTotal() {
    this.total = 0;
    for (let p of this.newItems) {
      this.total += p.price * p.quantity;
    }
    // console.log('Total before: ', this.total);
    // console.log('This is selected', this.selectedProvince);
    this.total += this.selectedProvince.shipping_charge;
  }

  onProvinceChange(event: any) {
    this.selectedProvince = event.value;
    this.calTotal();
  }

  checkOut() {
    const address = {
      'house_number': this.formOrder.value.house_number,
      'street': this.formOrder.value.street,
      'province_id': this.selectedProvince.id,
    };

    var order_id: any;
  
    this.service.postData('address', address).subscribe((result: any) => {
      const order = {
        'note': this.formOrder.value.note,
        'created_on_utc': this.time,
        'customer_id': this.customer.id,
        'shipping_address_id': result.id,
        'total_price': this.total,
        'status': 'PENDING',
      };
  
      this.service.postData('orders', order).subscribe((newOrder: any) => {
        order_id = newOrder.id;
        alert('Order Successfully! Please wait for shop to confirm!');
  
        from(this.newItems)
          .pipe(
            concatMap((item: any) => {
              const order_item = {
                'order_id': order_id,
                'product_id': item.id,
                'quantity': item.quantity,
                'rate' : 0,
                'comment' : ''
              };
  
              return this.service.postData('order_item', order_item).pipe(
                concatMap(() =>
                  this.service.deleteData('shopping_cart_item', item.cart_item_id)
                )
              );
            })
          )
          .subscribe(
            (response) => console.log('Delete response:', response),
            (error) => console.error('Delete error:', error)
          );
      });
    });
  }
  
}
