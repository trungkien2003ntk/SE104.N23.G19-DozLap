import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 
    'username', 
    'password', 
     'email',
     'first_name',
    'last_name',
    'gender',
    'phone_number',
    'date_of_birth',
    // 'cardId',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, 
    private _emService: ManufacturerService,
    private _coreService: CoreService) {}
  ngOnInit(): void {
    this.getCustomList();
  }

  openAddEditManuForm()
  {
    const dialogRef = this._dialog.open(CustomDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getCustomList();
         }
      }
    });
  }

  getCustomList() {
    this._emService.getCustList().subscribe({
      next:  (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  deleteCate(id: number) {
    this._emService.deleteCate(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Customer deleted!', 'done');
        this.getCustomList();
      },
      error: console.log,
    })
  }

  openEditForm(data: any)
  {
    const dialogRef = this._dialog.open(CustomDialogComponent, {
      data, 
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getCustomList();
         }
      }
    });
  }
}

