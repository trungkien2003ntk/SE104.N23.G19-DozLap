import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManufacturerComponent } from './pages/manufacturer/manufacturer.component';
import { ManuDialogComponent } from './pages/manu-dialog/manu-dialog.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CateDialogComponent } from './pages/cate-dialog/cate-dialog.component';
import { ProdDialogComponent } from './pages/prod-dialog/prod-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FileUploadModule } from "primeng/fileupload";
//
import { MaterialModule } from 'src/material.module';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderDialogComponent } from './pages/order-dialog/order-dialog.component';
import { CustomDialogComponent } from './pages/custom-dialog/custom-dialog.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';
import { OrderdetaildialogComponent } from './pages/orderdetaildialog/orderdetaildialog.component';





@NgModule({
  declarations: [
    AppComponent,
    ManufacturerComponent,
    ManuDialogComponent,
    ProductComponent,
    CategoryComponent,
    CateDialogComponent,
    ProdDialogComponent,
    DashboardComponent,
    LoginComponent,
    CustomerComponent,
    OrderComponent,
    OrderDialogComponent,
    CustomDialogComponent,
    OrderdetailComponent,
    OrderdetaildialogComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    FileUploadModule,
    MaterialModule,
    ToastrModule.forRoot(),

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
