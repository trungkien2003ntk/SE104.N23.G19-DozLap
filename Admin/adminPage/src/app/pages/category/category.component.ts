import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { CateDialogComponent } from '../cate-dialog/cate-dialog.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 
    'name', 
    'description', 
    // 'displayOrder',
    // 'picture',
    'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, 
    private _emService: ManufacturerService,
    private _coreService: CoreService) {}
  ngOnInit(): void {
    this.getCateList();
  }

  openAddEditManuForm()
  {
    const dialogRef = this._dialog.open(CateDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getCateList();
         }
      }
    });
  }

  getCateList() {
    this._emService.getCateList().subscribe({
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
        this._coreService.openSnackBar('Category deleted!', 'done');
        this.getCateList();
      },
      error: console.log,
    })
  }

  openEditForm(data: any)
  {
    const dialogRef = this._dialog.open(CateDialogComponent, {
      data, 
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getCateList();
         }
      }
    });
  }
}

