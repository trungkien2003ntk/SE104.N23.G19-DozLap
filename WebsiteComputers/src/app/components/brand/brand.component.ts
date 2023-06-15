import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  contents:any =[];
  responsiveOptions: any;
	getParamBrand: any;
  selectedBrand:any;

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
      this.selectedBrand = params.get('brand');
      this.pageTitle.setTitle(this.selectedBrand);
      this.getProducts();
    });

  }
  
  getProducts() {
    this.service.getData("products").subscribe((result) =>
    {
      this.contents = result.filter((product:any) => product.brand === this.selectedBrand);
    });
  }
}
