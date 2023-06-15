import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Manufacturer } from './services/manufacturer';
import { ManufacturerService } from './services/manufacturer.service';
import { ApiServiceService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  banner: any = [];
  brands:any = [];
  contents:any =[];
  responsiveOptions: any;

  constructor(private service: ApiServiceService){
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

    this.getBanner();

    this.getBrands();

    //test
  }

  getBanner(){
    this.service.getData("products").subscribe((result) =>
    {
      this.banner = result.slice(0, 5);
    });
  }

  getBrands() {
    this.service.getData("brands").subscribe((result) =>
    {
      this.brands = result;
    });
  }

  onSearchClick(searchInput: HTMLInputElement) {
    searchInput.value = '';
  }

  onSearchEnter(searchInput: HTMLInputElement) {
    const searchButton = searchInput.nextElementSibling as HTMLElement;
    searchButton.click();
  }
}
