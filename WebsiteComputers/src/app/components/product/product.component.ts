import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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

  
  constructor(private service: ApiServiceService, private router: ActivatedRoute, private pageTitle: Title){
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

  getProductInfo() {
    this.service.getData("products").subscribe((result) =>
    {
      this.product = result.filter((data:any) => data.id == this.id)[0];
      this.pageTitle.setTitle(this.product.name);
    });
    
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
