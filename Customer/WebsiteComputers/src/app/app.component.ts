import { Component } from '@angular/core';
import { ApiServiceService } from './services/api-service.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoginPage!: boolean;
  banner: any = [];
  category:any = [];
  contents:any =[];
  responsiveOptions: any;

  constructor(private service: ApiServiceService, private router: Router){

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = (event.url === '/login' || event.url === '/register' );
      }
    });
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

    this.getcategory();

    //test
  }

  getBanner(){
    this.service.getData("product").subscribe((result) =>
    {
      this.banner = result.slice(0, 5);
    });
  }

  getcategory() {
    this.service.getCategory().subscribe((result) =>
    {
      this.category = result;
    });
  }

  onSearchClick(searchInput: HTMLInputElement) {
    searchInput.value = '';
  }

  onSearchEnter(searchInput: HTMLInputElement) {
    const searchButton = searchInput.nextElementSibling as HTMLElement;
    searchButton.click();
  }

  logout() {
    // Clear the session storage
    sessionStorage.clear();

    // Redirect the user to the login page
    this.router.navigate(['login']);
}
}
