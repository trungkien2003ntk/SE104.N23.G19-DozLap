import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  items: MenuItem[] = [];
  banner: any = [];
  brands:any = [];
  contents:any =[];
  responsiveOptions: any;
	getParamBrand: any;
  selectedBrand:any;

    //test
    sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];

    sortOrder: number = 0;
  
    sortField: string = '';
    
    sortKey: any;
  

  constructor(private service: ApiServiceService, private router: ActivatedRoute){
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
      this.getProducts();
    });

    this.getItemsNav();

    this.getBanner();
    
    this.getBrands();
  }

  getItemsNav() {
    this.items = [
      {
          label:'Screen',
          icon:'pi pi-fw pi-file',
      },
      {
          label:'PC',
          icon:'pi pi-fw pi-pencil',
      },
      {
          label:'Laptop',
          icon:'pi pi-fw pi-user',
      },
      {
          label:'Keyboard',
          icon:'pi pi-fw pi-calendar',
      },
    ];
  }

  getBanner(){
    this.service.getData("banner").subscribe((result) =>
    {
      console.log(result, 'bannerResult#');
      this.banner = result;
    });
  }

  getProducts() {
    this.service.getData("products").subscribe((result) =>
    {
      this.contents = result.filter((product:any) => product.brand === this.selectedBrand);
    });
  }

  getBrands() {
    this.service.getData("brands").subscribe((result) =>
    {
      console.log(result, 'brandsResult#');
      this.brands = result;
    });
  }

  onSortChange(event:any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }
}
