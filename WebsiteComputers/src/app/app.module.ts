
import { BrowserModule } from '@angular/platform-browser';

import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { BrandComponent } from './components/brand/brand.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import {DataViewModule} from 'primeng/dataview';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// test
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {RatingModule} from 'primeng/rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './components/search/search.component';
import { ProductComponent } from './components/product/product.component';
import { TableProductComponent } from './components/table-product/table-product.component';
import { TabViewModule } from 'primeng/tabview';
import { UserComponent } from './components/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandComponent,
    NotFoundComponent,
    SearchComponent,
    ProductComponent,
    TableProductComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,

    //my import
    MenubarModule,
    ButtonModule,
    CarouselModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    // test
    DataViewModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    RatingModule,
    BrowserAnimationsModule,
    TabViewModule,
    ReactiveFormsModule
  ],
  providers: [
    //my imports
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
