import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  categories: any = [];
  contents: any = [];
  responsiveOptions: any;
  getParamCategory: any;
  selectedCategory: any;
  selectedCategoryId: any;

  constructor(
    private service: ApiServiceService,
    private router: ActivatedRoute,
    private pageTitle: Title
  ) {
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
    this.router.paramMap.subscribe((params) => {
      this.pageTitle.setTitle(this.selectedCategory);
      this.selectedCategoryId = Number(params.get('id'));
      this.getProducts();
      this.getCategories();
    });
  }

  getProducts() {
    this.service.getProduct().subscribe((result) => {
      this.contents = result.filter((product: any) => {
        return product.category_id === this.selectedCategoryId;
      });
    });
  }

  getCategories() {
    this.service.getCategory().subscribe((result: any) => {
      this.categories = result.filter((category:any)=>
        {
          if (category.id === this.selectedCategoryId)
            this.selectedCategory = category.name;
        }
      );
    });
  }
}
