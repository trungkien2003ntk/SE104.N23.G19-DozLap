import { Component,DoCheck } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminPage';
  isMenuVisible=false;
  constructor(private route:Router){
  }
    //Sidebar toggle show hide function
status = false;
addToggle()
{
  this.status = !this.status;       
}

ngDoCheck(): void {
  let currentroute = this.route.url;
  if (currentroute == '/login') {
    this.isMenuVisible = false;
  } else {
    this.isMenuVisible = true;
  }
} 
}
