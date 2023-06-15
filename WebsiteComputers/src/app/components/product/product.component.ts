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
  specs:any;
  specification:any = [];
  
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
    this.service.getData("product").subscribe((result) =>
    {
      this.product = result.filter((data:any) => data.id == this.id)[0];
      this.pageTitle.setTitle(this.product.name);
      this.product.description = this.formatJsonString(this.product.description);
      this.specs = this.product.specs.split("|\r\n");
      this.specs.pop();
      this.convertSpecs();
      console.log("This is specs", this.specification);
    });
    
  }

  addToCart(id: any) {
    console.log(id, 'This is value!!!');
    const data = {
      "id" : Math.floor(Math.random() * 1000000),
      "productId": id,
      "customerId": 1,
      "quantity": 1
    };
    this.service.postData("cart", data).subscribe((result) =>
    {
      console.log(result, "This is postData");
    });
  }
}
