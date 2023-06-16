import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service'; 
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  constructor(private service: AuthService,private toastr:ToastrService,private router: Router) {
   
    this.LoadCustomer();
  }
  customerlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

  }
  LoadCustomer() {
    this.service.GetAllCustomer().subscribe(res => {
      this.customerlist = res;
      this.dataSource = new MatTableDataSource(this.customerlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  displayedColumns: string[] = ['code', 'name', 'creditlimit', 'action'];

  updatecustomer(code: any) {

    
       this.toastr.success('Success')
    

  }
  removecustomer(code: any) {
   
      this.toastr.success('Success')
   
  }
  addcustomer() {
    
      this.toastr.success('Success')
   
  }


}
