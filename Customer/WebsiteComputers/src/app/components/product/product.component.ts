import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  
  responsiveOptions: any;
  id:any;
  product:any;
  cartItems: any = [];
  specs:any;
  specification:any = [];
  order_item:any;
  
  constructor(private service: ApiServiceService, private router: ActivatedRoute, private pageTitle: Title, private routerLink : Router){
    this.initResponsive();
    
  }

  initResponsive() {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }

  ngOnInit() {

    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getProductInfo();
    });
  }

  formatJsonString(inputString: string): string {
    return inputString.replace(/\|/g, '').replace(/\r\n/g, '<br>');
  }

  convertSpecs()
  {
    let len = this.specs.length;
    for (let i = 0; i < len; i++) {
      this.specification.push(this.specs[i].split('    '));
    }
  }

  getProductInfo() {
    this.service.getProduct().subscribe((result) =>
    {
      this.product = result.filter((data:any) => data.id == this.id)[0];
      this.pageTitle.setTitle(this.product.name);
      this.product.description = this.formatJsonString(this.product.description);
      this.specs = this.product.specs.split("|\r\n");
      this.specs.pop();
      this.convertSpecs();
      this.getOrderItem();
    });
  }

  getOrderItem() {
    this.service.getData('order_item').subscribe((result: any) => {
      this.order_item = result.filter((item: any) => {
        if (item.rate === 0)
        return false;
        return item.product_id === this.product.id});
      // console.log('This is order item', this.order_item);
    });
  }

  async getCartItems(): Promise<any> {
    return new Promise<void>(resolve => {
      this.service.getData('shopping_cart_item').subscribe((result) => {
        console.log('cart item', result);
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
      this.routerLink.navigate(['login']);
      return;
    }
    await this.getCartItems();
    const data = {
      "product_id": id,
      "customer_id": Number(sessionStorage.getItem('id')),
      "quantity": 1,
      "created_on_utc": new Date().toISOString()
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
