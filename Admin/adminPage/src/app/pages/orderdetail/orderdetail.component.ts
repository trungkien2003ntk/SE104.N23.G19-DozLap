

import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { OrderdetaildialogComponent } from '../orderdetaildialog/orderdetaildialog.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})

export class OrderdetailComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id', 
    // 'order_id', 
    'product_id', 
    'quantity',
    'rate',
    'comment',
    'action'];
  dataSource!: MatTableDataSource<any>;

  orderId: number | undefined;

  thisOrder: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, 
    private _emService: ManufacturerService,
    private _coreService: CoreService,
    private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.orderId = +id;
        // You can use orderId within this component
        console.log('Order ID:', this.orderId);
      } else {
        // Handle the case when id is null
      }
    });
    this.getOrderItemsByOrderId(this.orderId);

    this._emService.getOrderById(this.orderId).subscribe(data => {
      this.thisOrder = data;
    });
  }

  openAddEditManuForm()
  {
    const dialogRef = this._dialog.open(OrderdetaildialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getOrderItemsByOrderId(this.orderId);
         }
      }
    });
  }

  getOrderItemsByOrderId(id: any) {
    this._emService.getOrderItemsByOrderId(id).subscribe({
      next:  (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteOrder(id: number) {
    this._emService.deleteOrderDetail(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Order detail deleted!', 'done');
        this.getOrderItemsByOrderId(this.orderId);
      },
      error: console.log,
    })
  }

  openEditForm(data: any)
  {
    const dialogRef = this._dialog.open(OrderdetaildialogComponent, {
      data, 
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getOrderItemsByOrderId(this.orderId);
         }
      }
    });
  }
}


