import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  contents:any =[];
  responsiveOptions: any;
  keyword:any;
  searchKeyword: any = '';

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
      this.keyword = params.get('keyword');
      this.getProducts();
    });
  }

  getProducts() {
    this.service.getProduct().subscribe((result) =>
    {
      this.pageTitle.setTitle("search " + this.keyword);
      this.contents = result.filter((product:any) => product.name.toLowerCase().indexOf(this.keyword.toLowerCase()) != -1);     
    });
  }

}