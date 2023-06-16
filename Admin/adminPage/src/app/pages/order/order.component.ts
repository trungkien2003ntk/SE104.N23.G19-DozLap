import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 
    'note', 
    'created_on_utc', 
    'customer_id',
    'shipping_address_id',
    'total_price',
    'status',
    'view',
    'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, 
    private _emService: ManufacturerService,
    private _coreService: CoreService) {}
  ngOnInit(): void {
    this.getOrderList();
  }

  openAddEditManuForm()
  {
    const dialogRef = this._dialog.open(OrderDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getOrderList();
         }
      }
    });
  }

  getOrderList() {
    this._emService.getOrderList().subscribe({
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
    this._emService.deleteOrder(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Order deleted!', 'done');
        this.getOrderList();
      },
      error: console.log,
    })
  }

  openEditForm(data: any)
  {
    const dialogRef = this._dialog.open(OrderDialogComponent, {
      data, 
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getOrderList();
         }
      }
    });
  }
}


