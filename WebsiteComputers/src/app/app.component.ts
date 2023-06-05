import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Manufacturer } from './services/manufacturer';
import { ManufacturerService } from './services/manufacturer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: MenuItem[] = [];
  products: Manufacturer[] = [];
  status = false;
	
	responsiveOptions;

	constructor(private productService: ManufacturerService) { 
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
    this.productService.getProductsSmall().then(products => {
			this.products = products;
		});

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
}
