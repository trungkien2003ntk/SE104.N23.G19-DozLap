import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ManufacturerComponent } from './pages/manufacturer/manufacturer.component';
import { CategoryComponent } from './pages/category/category.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './pages/order/order.component';
import { AppComponent } from './app.component';
import { OrderDialogComponent } from './pages/order-dialog/order-dialog.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';


const routes: Routes = [
  {component:LoginComponent,path:'login'},
  {component:CustomerComponent,path:'customer',canActivate:[AuthGuard]},
  // { path: 'manufacturer', component: ManufacturerComponent, canActivate:[AuthGuard] },
  { path: 'product', component: ProductComponent, canActivate:[AuthGuard] },
  {path: 'category', component: CategoryComponent, canActivate:[AuthGuard] },
   { path: 'dashboard', component: DashboardComponent , canActivate:[AuthGuard]}, 
   { path: 'order', component: OrderComponent , canActivate:[AuthGuard]},
   { path: 'orderdetail/:id', component: OrderdetailComponent, canActivate: [AuthGuard] },
   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
