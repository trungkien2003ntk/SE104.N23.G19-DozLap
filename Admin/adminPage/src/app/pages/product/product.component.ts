import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { ProdDialogComponent } from '../prod-dialog/prod-dialog.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 
    'name', 
    'image_url',
    'description',
    'specs',
    'price',
    'status',
    'category_id',
    'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, 
    private _emService: ManufacturerService,
    private _coreService: CoreService) {}
  ngOnInit(): void {
    this.getProdList();
  }

  openAddEditManuForm()
  {
    const dialogRef = this._dialog.open(ProdDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getProdList();
         }
      }
    });
  }

  getProdList() {
    this._emService.getProdList().subscribe({
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

  deleteProd(id: number) {
    this._emService.deleteProd(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Product deleted!', 'done');
        this.getProdList();
      },
      error: console.log,
    })
  }

  openEditForm(data: any)
  {
    const dialogRef = this._dialog.open(ProdDialogComponent, {
      data, 
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getProdList();
         }
      }
    });
  }
}
